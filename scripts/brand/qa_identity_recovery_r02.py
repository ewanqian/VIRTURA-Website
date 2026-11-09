#!/usr/bin/env python3
"""Source-only QA for unapproved SpacePort visual recovery studies.

Passing this check does not imply design, trademark, copyright or web publication acceptance.
"""
from pathlib import Path
from xml.etree import ElementTree as ET
import json
repo=Path(__file__).resolve().parents[2]
registry=json.loads((repo/"docs/brand/spaceport-brand-registry.v01.json").read_text(encoding="utf8"))
sha="9477c497043a9eeb7ccf981bd2d4e086c93f765ec4dfbd22aa9cce893be000a1"
ids=("virtual-airlines","mova","teahouse","nature-retreat")
for ident in ids:
    b=next((x for x in registry["brands"] if x["id"]==ident),None)
    assert b,ident
    assert b["vectorMasterAvailable"] is False and b["publicRightsVerified"] is False,ident
    assert b["sourceAttributionAudit"]["sourceSha256"]==sha,ident
    assert b["sourceAttributionAudit"]["status"]=="review-required",ident
    for c in b["candidates"]:
        for src in c["files"]:
            p=repo/src
            assert p.is_file(),src
            assert ".candidate.svg" in src and "brand-candidates/" in src,src
            text=p.read_text(encoding="utf8")
            root=ET.fromstring(text)
            assert root.tag.endswith("svg") and "viewBox" in root.attrib,src
            assert ("not" in text.lower() or "unverified" in text.lower()) and any(v in text.lower() for v in ("original","approved","official","placeholder")),src
t=next(x for x in registry["brands"] if x["id"]=="teahouse")
r=next(x for x in registry["brands"] if x["id"]=="nature-retreat")
assert any("no unequivocally assigned" in s for s in t["recognition"])
assert any("framed layered-roof" in s for s in r["recognition"])
assert "Do NOT assign" in t["sourceAttributionAudit"]["finding"]
for file in ("docs/brand/VIRTURA-SPACE-VISUAL-DNA-2026-11-08.md","docs/brand/RECOVERY-R02-SOURCE-ATTRIBUTION-2026-11-09.md"):
    src=(repo/file).read_text(encoding="utf8")
    assert "茶屋" in src and "疗养" in src and "待" in src,file
page=(repo/"design/spaceport-identity-study-r02.html").read_text(encoding="utf8")
assert 'name="robots" content="noindex,nofollow"' in page
for candidate in ("va-orbit-emblem.candidate.svg","mova-stroke-lettering.candidate.svg","teahouse-wordmark.candidate.svg"):
    assert candidate in page
for photo in ("gateway-spaceport.jpg","station-mova.jpg","station-tea-house.jpg"):
    assert (repo/"assets/spaces"/photo).is_file(),photo
assert "source" in page.lower() and "NOT APPROVED" in page
assert "../space/station.html" not in page
print("PASS: 4 source-attributed identities, SVG candidate structures, source SHA and review page.")
print("NOT TESTED: original master/fontrights, actual service deployment, approved mark or image composition.")
