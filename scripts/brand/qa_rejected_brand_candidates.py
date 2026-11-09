#!/usr/bin/env python3
"""Prevent rejected or unapproved brand vector candidates from entering production UI."""
from pathlib import Path
import re
root=Path(__file__).resolve().parents[2]
candidate=re.compile(r"(?:brand-candidates/[^\s'\"\)<>]+|[^\s'\"\)<>]+\.candidate\.svg)")
# design/ is explicitly review-only; markdown, docs, research and QA may cite bad attempts.
scan=[root/"index.html",*(root/p for p in ("apps","space","work"))]
bad=[]
for p in scan:
    if not p.exists():continue
    files=[p] if p.is_file() else [x for x in p.rglob("*") if x.suffix.lower() in {".html",".css",".js",".jsx",".ts",".tsx"}]
    for f in files:
        src=f.read_text(encoding="utf-8")
        for m in candidate.finditer(src):
            bad.append((str(f.relative_to(root)),m.group(0)))
assert not bad,"REJECTED/UNAPPROVED BRAND CANDIDATE IMPORT INTO PRODUCTION:\n" + "\n".join(f"{a}: {b}" for a,b in bad)
registry=root/"docs/brand/spaceport-brand-registry.v01.json"
import json
d=json.loads(registry.read_text(encoding="utf-8"))
for ident in ("virtual-airlines","mova","teahouse","nature-retreat"):
    item=next(x for x in d["brands"] if x["id"]==ident)
    assert any(x["status"]=="rejected-source-fidelity-mismatch" and x["mustNotPublish"] for x in item.get("rejectedVisualStudies",[])),ident
    assert item["vectorMasterAvailable"] is False and item["publicRightsVerified"] is False,ident
print("PASS: No rejected/unapproved candidate logos referenced by production routes; R02 rejection recorded.")
print("Design approval still requires original-source overlay and human signoff.")
