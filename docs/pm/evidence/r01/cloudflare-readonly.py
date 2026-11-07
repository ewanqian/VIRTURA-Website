"""Read-only Cloudflare audit. Credential file stays outside repository; never print token."""
from pathlib import Path
import datetime, json, re, subprocess, os
credential = Path(os.environ.get('CLOUDFLARE_CREDENTIAL_FILE', str(Path.home()/'.codex/secrets/virtura/cloudflare-api-token.env')))
values = {}
for line in credential.read_text().splitlines():
    match = re.match(r'(?:export\s+)?([A-Za-z_][\w]*)\s*=\s*(.*)', line.strip())
    if match: values[match[1]] = match[2].strip().strip('\"\'')
token, account = values['CLOUDFLARE_API_TOKEN'], values['CLOUDFLARE_ACCOUNT_ID']
def get(endpoint):
    config = 'header = ' + json.dumps('Authorization: Bearer '+token) + '\n'
    result = subprocess.run(['curl','-fsS','--max-time','30','--config','-', 'https://api.cloudflare.com/client/v4'+endpoint], input=config, capture_output=True, text=True)
    if result.returncode: raise RuntimeError('Cloudflare GET failed: '+result.stderr.replace(token,'[REDACTED]'))
    payload = json.loads(result.stdout)
    if not payload.get('success'): raise RuntimeError('Cloudflare GET reported failure')
    return payload
def deployment(d):
    meta = d.get('deployment_trigger',{}).get('metadata',{})
    return {**{k:d.get(k) for k in ['id','environment','url','created_on','is_skipped','latest_stage','stages']}, 'branch':meta.get('branch'),'commit_hash':meta.get('commit_hash')}
base = f'/accounts/{account}/pages/projects/virtura-website'
verify = get('/user/tokens/verify')['result']
project = get(base)['result']
source = project.get('source',{}).get('config',{})
report = {'collectedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(), 'method':'GET only; no deployment, rollback or token modification', 'tokenStatus':verify.get('status'), 'project':{k:project.get(k) for k in ['name','subdomain','domains','production_branch']}, 'build':{k:project.get('build_config',{}).get(k) for k in ['build_command','destination_dir','root_dir']}, 'source':{k:source.get(k) for k in ['owner','repo_name','production_branch','deployments_enabled','production_deployments_enabled','preview_deployment_setting','preview_branch_includes','preview_branch_excludes']},'canonicalDeployment':deployment(project['canonical_deployment']),'latestDeployment':deployment(project['latest_deployment'])}
report['domains'] = [{k:d.get(k) for k in ['name','status']} for d in get(base+'/domains')['result']]
rows, page = [], 1
while True:
    result=get(base+f'/deployments?per_page=20&page={page}')
    rows.extend(deployment(d) for d in result['result'])
    if page >= result['result_info']['total_pages']: break
    page += 1
report['deployments']=rows
canonical=project['canonical_deployment']['id']
logs=get(base+f'/deployments/{canonical}/history/logs')['result']
report['productionLogs']={'deploymentId':canonical,'total':logs['total'],'entries':[{'ts':e.get('ts'),'line':re.sub(r'(?i)(bearer\s+|token\s*[=:]\s*|secret\s*[=:]\s*)\S+',r'\1[REDACTED]',e['line'].replace(token,'[REDACTED]'))} for e in logs['data']]}
encoded=json.dumps(report,indent=2)
assert token not in encoded
Path('docs/pm/evidence/r01/cloudflare-api-evidence.json').write_text(encoded+'\n')
print('Read-only Cloudflare evidence saved:',len(rows),'deployments;',logs['total'],'production log entries')
