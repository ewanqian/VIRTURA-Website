import hashlib, json
from pathlib import Path
p = Path(__file__).parent
rows = json.loads((p / 'manifest.json').read_text())
assert {r['pr'] for r in rows} == {130,132,134,121,94}
for r in rows:
    data = (p / f"{r['pr']}-diff.txt").read_bytes()
    meta = json.loads((p / f"{r['pr']}-metadata.txt").read_text())
    assert hashlib.sha256(data).hexdigest() == r['diffSHA256']
    assert len(data) == r['bytes']
    assert meta['headRefOid'] == r['headSHA']
    assert data.startswith(b'diff --git ')
    print(r['pr'], 'PASS', r['headSHA'], len(data))
print('5 source snapshots verified; no historic CI/runtime result inferred')
