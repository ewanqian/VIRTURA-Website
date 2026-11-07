from html.parser import HTMLParser
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,io,json
from PIL import Image
class Images(HTMLParser):
 def __init__(self):super().__init__();self.paths=set()
 def handle_starttag(self,t,a):
  if t=='img':
   d=dict(a)
   if d.get('src'):self.paths.add(d['src'])
p=Images();p.feed(Path('index.html').read_text())
def check(src):
 url='https://virtura.space/'+src
 try:
  r=subprocess.run(['curl','-fsSL','--max-time','25',url],capture_output=True)
  if r.returncode: return dict(src=src,curlExit=r.returncode,error=r.stderr.decode())
  with Image.open(io.BytesIO(r.stdout)) as im:im.load();return dict(src=src,curlExit=0,format=im.format,width=im.width,height=im.height,decoded=True)
 except Exception as e:return dict(src=src,error=str(e),decoded=False)
rows=list(ThreadPoolExecutor(max_workers=4).map(check,sorted(p.paths)))
Path('docs/pm/evidence/r01/image-decode.json').write_text(json.dumps(rows,indent=2));print(len(rows),'assets;',sum(bool(r.get('decoded')) for r in rows),'decoded')
