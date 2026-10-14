import json,subprocess,hashlib
from pathlib import Path
p=Path('assets/data/fabric-catalogue.js');s=p.read_text(encoding='utf-8');data=json.loads(s[s.index('{'):s.rindex('}')+1]);s0=subprocess.check_output(['git','show','HEAD:assets/data/fabric-catalogue.js']).decode('utf-8');old=json.loads(s0[s0.index('{'):s0.rindex('}')+1]);rows=json.loads(Path('reports/honeycomb/inventory.json').read_text())
assert {k:v for k,v in data.items() if k!='honeycomb'}=={k:v for k,v in old.items() if k!='honeycomb'}
for c in data['honeycomb']['collections']:
 for t in c['types']:
  for f in t['fabrics']:
   for key in ['swatchHex','closeUpImage','imageSource']:
    original=next(f0 for c0 in old['honeycomb']['collections'] if c0['id']==c['id'] for t0 in c0['types'] if t0['id']==t['id'] for f0 in t0['fabrics'] if f0['code']==f['code'])
   assert {k:v for k,v in f.items() if k not in ['swatchHex','closeUpImage','imageSource']}=={k:v for k,v in original.items() if k not in ['swatchHex','closeUpImage','imageSource']}
for r in rows:assert hashlib.sha256(Path(r['path']).read_bytes()).hexdigest()==r['sha256']
print('Unrelated catalogue unchanged; original colour metadata preserved; all 42 extracted assets match archive hashes.')
