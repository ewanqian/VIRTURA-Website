#!/usr/bin/env python3
"""Verify unmodified user source images and AI concept studies.

Run:
  python3 scripts/brand/verify_and_stage.py --source-zip original.zip --concept-zip concepts.zip
Optional explicit local stage copy (never commits):
  ... --stage-to /path/to/local/review-folder
"""
from __future__ import annotations
import argparse
import hashlib
import io
import json
from pathlib import Path
from zipfile import ZipFile

ROOT_GROUPS = ("01_source_user_supplied/", "02_concepts_selected_direction/", "03_concepts_other_exploration/")

def check(archive_path: Path, stage_to: Path | None) -> tuple[int, int]:
    checked = 0
    size = 0
    with ZipFile(archive_path) as z:
        entries = {i.filename for i in z.infolist() if not i.is_dir()}
        manifest = json.loads(z.read("MANIFEST.json"))
        for item in manifest["entries"]:
            name = item["archive_path"]
            if name not in entries:
                continue
            if not name.startswith(ROOT_GROUPS) or ".." in Path(name).parts:
                raise ValueError("Unsafe archive path: " + name)
            data = z.read(name)
            actual = hashlib.sha256(data).hexdigest()
            if actual != item["sha256"] or len(data) != item["bytes"]:
                raise ValueError("Mismatch: " + name)
            checked += 1
            size += len(data)
            if stage_to is not None:
                out = (stage_to / name).resolve()
                if not out.is_relative_to(stage_to.resolve()):
                    raise ValueError("Unsafe output: " + name)
                if out.exists() and out.read_bytes() != data:
                    raise FileExistsError("Will not overwrite changed file: " + str(out))
                out.parent.mkdir(parents=True, exist_ok=True)
                out.write_bytes(data)
    return checked, size

def main() -> None:
    p = argparse.ArgumentParser()
    p.add_argument("--source-zip", type=Path, required=True)
    p.add_argument("--concept-zip", type=Path, required=True)
    p.add_argument("--stage-to", type=Path, help="Optional local review folder, never the public site root")
    args = p.parse_args()
    a, size_a = check(args.source_zip, args.stage_to)
    b, size_b = check(args.concept_zip, args.stage_to)
    if (a, b) != (14, 6):
        raise SystemExit(f"FAIL: expected (14 original, 6 concept), got ({a}, {b})")
    print(f"PASS: {a} untouched source images ({size_a} bytes), {b} concept images ({size_b} bytes)")
    print("This verifies source bytes, NOT their public usage rights or official logo status.")
    if args.stage_to:
        print("Staged for LOCAL REVIEW only:", args.stage_to.resolve())

if __name__ == "__main__":
    main()
