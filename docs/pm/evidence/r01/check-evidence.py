import json
from pathlib import Path
from PIL import Image
base = Path(__file__).parent
r = json.loads((base / 'runtime.json').read_text())
assert len(r['samples']) == 30
assert len(r['http']) == 10 and all(x.get('status') == 200 and x.get('matchesMainFile') for x in r['http'])
rows = []
for s in r['samples']:
    path = base / s['screenshot']
    with Image.open(path) as img:
        img.verify()
    with Image.open(path) as img:
        rows.append({'file':path.name,'size':img.size,'viewport':s['width'],'requestedLang':s['requestedLang'],'actualLang':s['lang'],'overflow':s['overflow']})
assert len({x['file'] for x in rows}) == 30
print(json.dumps({'result':'evidence integrity PASS, known page defects remain','httpMatches':10,'screenshots':rows},indent=2))
