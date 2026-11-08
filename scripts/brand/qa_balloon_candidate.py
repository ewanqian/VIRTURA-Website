#!/usr/bin/env python3
"""Source and structure gate for BALLOON *candidate*, not approved brand approval."""
from pathlib import Path
from xml.etree import ElementTree as ET
import json

root=Path(__file__).resolve().parents[2]
loc=root/"assets/brand-candidates/balloon"
tokens=json.loads((loc/"balloon-design-tokens.candidate.json").read_text(encoding="utf-8"))
assert tokens["status"]=="candidate-not-approved"
assert not tokens["colors"]["approvedPalette"]
assert tokens["mark"]["sourceMasterMissing"]
assert len(tokens["basedOn"])==2
assert tokens["basedOn"][0]["sourceSha256"]=="33ec32695fadc488ae3a6a3ce1f51acddb7b16f1e8ba6de9d22949decba59042"
assert tokens["basedOn"][1]["sourceSha256"]=="9477c497043a9eeb7ccf981bd2d4e086c93f765ec4dfbd22aa9cce893be000a1"
expected=["#1711F8","#F66AF5","#F9F932","#F6F6F2"]
for svgfile in ["balloon-colour-disc.candidate.svg","balloon-horizontal-lockup.candidate.svg"]:
    data=(loc/svgfile).read_text(encoding="utf-8")
    svg=ET.fromstring(data)
    assert svg.tag.endswith("svg") and "viewBox" in svg.attrib,svgfile
    indices=[data.find(c) for c in expected]
    assert all(i>=0 for i in indices) and indices==sorted(indices),(svgfile,indices)
    assert "Not an approved" in data or "not a certified" in data,svgfile
lock=(loc/"balloon-horizontal-lockup.candidate.svg").read_text(encoding="utf-8")
assert "太空" in lock and "气球" in lock and all(x in lock for x in ["BALLOON","LIVE","SPACE"])
page=(root/"design/balloon-identity-review.html").read_text(encoding="utf-8")
assert '<meta name="robots" content="noindex,nofollow">' in page
assert "balloon-horizontal-lockup.candidate.svg" in page
assert "balloon-colour-disc.candidate.svg" in page
assert "../assets/spaces/station-balloon.jpg" in page
assert (root/"assets/spaces/station-balloon.jpg").exists()
assert "VIRTURA-SpacePort/tree/main/stations/balloon-live-space" in page
assert 'href="../space/station.html' not in page
assert "aria-pressed" in page and "focus-visible" in page
print("PASS: Balloon source hash, four-colour order, editable SVG, preview and candidate-only constraints.")
print("NOT TESTED: original master geometry, actual CJK font match, visuals, licensing or public remote programme availability.")
