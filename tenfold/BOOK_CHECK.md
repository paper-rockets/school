# Book check: Tenfold vs the book photos

Goal: make sure every lesson's menu title, examples and answers in Tenfold match the Grade 3 book pages.

## Summary of mismatches (pages 7-53, checked 2026-09-29)

**REAL** = a wrong number, answer, page reference, or a picture that doesn't match its own answer. **Wording** = the maths is right but it's said or shown differently from the book. Full notes per page are further down.

### Real mistakes (fix these first)

| Page | Book says | App says | Suggested fix |
|---|---|---|---|
| 9 | 1234 *contains* 1 thousand, 12 hundreds, 123 tens, 1234 ones | Fact "1,234 = 1 thousand = 12 hundreds = …" (says 1234 equals 1 thousand) | "1234 contains 1 thousand, or 12 hundreds, or 123 tens, or 1234 ones" |
| 18 | 49 − □ = 25: second term missing, so *subtract* (49 − 25 = 24) | Calls it "the inverse" and the wrong-answer hint says "undo the visible operation" (undoing − means adding: 74, wrong) | Per-problem hint: first term missing → add; second term missing → subtract |
| 24 | 18 ÷ 3 = 6, equal groups, no remainders | Groups stepper 1-6: with 4 groups it says "4 r 2, 2 left over" but draws 5, 5, 5, 3 | Draw the quotient in each box + leftovers apart, or only allow 1, 2, 3, 6 groups |
| 33 | Triangular prism net = 2 triangles + **3** rectangles | Draws **4** square faces (f4 has no position in expanded.css) + 2 triangles | Remove f4; make faces taller rectangles |
| 34 | Workbook B, **page 26** | Source "Workbook B, p. 24" | Change to p. 26 |
| 38 | Workbook B **p66**: 53 × 2 = 106 with base-10 blocks, regroup 10 tens as 1 hundred | "Workbook B, p. 68", 4 × 23 = 92 by partial products (not on this page) | Use 53 × 2 with blocks and regrouping; source p. 66 |
| 39 | First example 583 → 580 | Opens on "200 rounds to 200" (value clamped to 10-200); "10" button loads 183 | Let the range fit (e.g. 500-700) and load 583 |
| 50 | "− 1" column = (n + 1) − 1, never below 0 | At n = 0 shows **"0 − 1 = 0"** | Use (n + 1) − 1 = n like the book |
| 51 | "− 2" column = (n + 2) − 2 | At n = 0 **"0 − 2 = 0"**, at n = 1 **"1 − 2 = 0"** | Use (n + 2) − 2 = n (the app's own fact line already says this) |

### Text that doesn't match its own picture

| Page | Book says | App says | Suggested fix |
|---|---|---|---|
| 21 | about 50 gemstones per sample | Each quarter draws 20 gems labelled "about 50" | Draw ~50 per quarter |
| 25 | pizza (circle) + collection | Visual line says "circular whole" but draws a bar | Draw a circle, or change the text |
| 35 | 16 ÷ 8 = 2 and 2 × 8 = 16 | Visual line says the division fact updates too, but only "2 × 3 = 6" shows | Add the division line / the 16 marbles |

### Different examples or method (maths right)

| Page | Book says | App says | Suggested fix |
|---|---|---|---|
| 8 | 1002, 1026, 1213, 2134 | 0002, 0020, 0200, 2000 | Use the book's four numbers |
| 9 | Unbundle 1234 (12 hundreds) | Unbundles 1,000 | Unbundle 1234 + the "look left" chart |
| 10 | Blocks: 100 + 100 + 10 + … + 1 | "2 × 100, 7 × 10, 3 × 1" | Show the long addition |
| 19 | Compare with a right angle / paper corner; no degrees | "Acute < 90°, right = 90°, obtuse > 90°", slider shows degrees | Say "smaller / bigger than a right angle" |
| 21 | 50 + 50 + 50 + 50 = 200 | "50 × 4" and "multiply" | Show repeated addition |
| 22 | Quantity : Value table (7 : 700, 4 : 40, 3 : 3) | "7 × 100 + 4 × 10 + 3" | Use the table |
| 35 | Area = count the square units | "2 × 3 = 6" | Count units |
| 45 | impossible / possible / certain line | "impossible (0) to certain (1)"; never says "possible" | Drop 0/1, add "possible" |

### Wording only

| Page | Book says | App says | Suggested fix |
|---|---|---|---|
| 7-53 | 1246, 13 500 (no comma, space for 5 digits) | 1,246 / 13,500 | Format like the book |
| 10 | 273 = 200 + 70 + 3 | 200 + 70 + 3 = 273 | Total first |
| 11 | 40 < 70, 300 > 100 | "4 is less than 7" | Compare place values |
| 16 | regroup (borrow) | exchange | "regroup" |
| 17 | Horizontal axis / Vertical axis, points on line crossings | "horizontal x / vertical y", points in cells | Drop x/y, plot on crossings |
| 20 | at least one part points inwards | one part points inward | "at least one" |
| 23 | 2 groups of 4 | rows / columns | "groups of" |
| 27 | "1." then tenths | point drawn before the tenths digit; "1 tenths" | Point after ones; singular |
| 28 | 4 dimes in the tenths column | "4 × $0.10" | Show coins |
| 29 | move the point after the target unit's digit | "one column right multiplies by 10" | Use the book's rule |
| 31 | "Number of Animals at Little Friends Pet Shop", "Type of Animal" / "Number of Animals" | "Animals at the pet shop", "Animal" / "Quantity" | Copy titles |
| 32 | triangles meet at the same vertex | "1 apex" | "vertex" |
| 37 | 25.0 − 4.8 = 20.2 | 25.00 − 4.80 = 20.20 | Pad only what's needed |
| 40 | remainder | left over | "remainder" |
| 41 | equal groups of 2 or more | "equal groups in more than one way", shows 1 × 9 | Book sentence, hide 1 × n |
| 43 | little hand / big hand / second hand | short / long / thin hand | Book words |
| 44 | an adult *usually* has more mass | "The adult contains more matter" | Add "usually" |
| 46 | pictures in each cell | letters, "(C, C)" is ambiguous | Use pictures |
| 48 | "Notes" | "Scratchpad" | Rename |
| 49-52 | + 0 / Commutative Property / − 0 / Inverse Operation | add zero / commute / halve / inverse | Book headings |

### Missing from the app (for the upgraded visuals)
p7 number in words · p12 line of symmetry + repeat-only frieze · p13/14/23/24 labels (terms, sum, difference, factors, product, dividend, divisor, quotient) · p18 the "check" step · p19 parallel lines · p23 0 × 5 = 0 · p25 names (quarter, half, fifth, two thirds) · p26/36 collection versions · p27 3.11 and 2.4 · p28 10¢ = 1/10, 5¢ = 5/100 · p29 which unit for what (ladybug, fish, snake) · p31 bar-graph title, axis titles, 0-8 scale · p32 cylinder, edge/vertex definitions, 5 named solids · p33 pyramid net · p35 13-unit odd shape · p37 five more examples incl. adding a 0 · p43 year/month/week/day, leap year, a.m./p.m. · p53 the "Double − 1" column and inverse subtractions.

### Resolved
- p14 "subtraction tables": the book page has none, only the title. App is fine.
- Pages that match with no real problems: 15, 26, 30, 36, 42, 47, 52.

## Where things are

- Book photos: `E:\Z School\Photos` (50 photos, taken sideways; EXIF rotation 6).
- Photo number n (in name order) = book page n + 3, except the first three:
  - #1 = p3 contents, #2 = p4 contents, #3 = p5 "Quick Tour"
  - #4 = p7 ... #50 = p53 (e.g. 1000145697.jpg = p7, 1000145743.jpg = p53)
  - p6 has no photo. **Pages 54-60 have no photos**, so those lessons can only be checked against the contents list.
- App text lives in two places:
  - `curriculum.js`: menu title, summary, "Keep this idea" fact, source ("Workbook A, p. 4"), starting numbers (config).
  - `engines.js`: examples and answers written into each activity (e.g. missing-term answers 30/14/79/24, decimal examples, number patterns, the 25 expressions, bar-graph values 5/2/8, animals/nuts list).
  - `app.js` `makeProblems()`: the Practice tab's five question types (make ten, times, subtract, perimeter, rounding).

## How to look at the photos

Make upright copies about 1800 px tall, then view ONE page at a time and write findings here right after each page (viewing many images in one go drops the older ones).

```python
from PIL import Image, ImageOps
import glob, os
out = r"<your scratchpad>\pages"
os.makedirs(out, exist_ok=True)
for i, f in enumerate(sorted(glob.glob(r"E:\Z School\Photos\*.jpg"))):
    im = ImageOps.exif_transpose(Image.open(f)).convert("RGB")
    w, h = im.size
    im.resize((int(w * 1800 / h), 1800), Image.LANCZOS).save(f"{out}\\p{i+1:02d}_page{i+4 if i >= 3 else i+3:02d}.jpg", quality=85)
```

## Findings so far (checked 2026-09-29)

### Contents pages (p3, p4) vs the lesson menu
- p8 book "Place Value in a Number (1)" -> app "A digit's place changes its value" (renamed, meaning OK)
- p9 book "Place Value in a Number (2)" -> app "How many groups are inside?" (renamed, meaning OK)
- p14 book "Subtraction and Subtraction Tables" -> app "Subtraction & inverse operations": **app leaves out subtraction tables** (check page 14)
- p29 book "Units of Measure for Length" -> app "Metric length" (renamed)
- p58 book "**Other Operations**" -> app "Grouping several addends": **possible mismatch**, no photo of p58 to confirm
- p59 book "Addition Table (0 to 10)" -> app "Master addition table" (OK)
- p60 is not in the contents (gap before p61). App uses it as a "Ready for multiplication & division" page. OK.
- Book pages 61-73 (0/1/5/10/2/4/3 times tables, Square Numbers p68, 9/6/7/8 times tables, Multiplication Table 0-10 p73) and Glossary p75 are not in the app. The app already says 61-73 are missing.
- All other titles match the contents.

### Page 7 (Section 1, Workbook A p4): Reading / Representing a Number
- Book examples: 6, 46, 246, 1246, each with words ("one thousand two hundred forty-six") and tags 1000 + 200 + 40 + 6. Then 1246 in a place-value chart, base-10 blocks and an abacus.
- App: 1246 in chart / blocks / abacus. Source "Workbook A, p. 4" is right.
- **Gap:** the app never shows the number in words.
- **Style:** the book writes 1246 with no comma; the app shows "1,246" everywhere (toLocaleString). The book uses no comma for 4-digit numbers (check how it writes 5-digit numbers, e.g. p39 "13 500").

### Page 8 (Section 2, Workbook A p10): Place Value in a Number (1)
- Book examples: in 1002 the 2 is worth 2; in 1026 worth 20; in 1213 worth 200; in 2134 worth 2000. Shown with Th/H/T/O charts and blocks.
- App: moves a 2 through the places with zeros everywhere else (0002, 0020, 0200, 2000). Fact "The digit 2 can mean 2, 20, 200, or 2,000." Source right.
- **Examples differ:** app could use the book's four numbers (1002, 1026, 1213, 2134) instead of zero-filled ones.

### Page 9 (Section 2, Workbook A p13): Place Value in a Number (2)
- Book: in 1234 the 2 is worth 200, but 1234 *contains* 12 hundreds (10 hundreds in the thousand). Strategy: look at the digit and every digit to its left. 1234 has 1 thousand, 12 hundreds, 123 tens, 1234 ones. Blocks: thousand cube opens into 10 hundred flats.
- App fact: "1,234 = 1 thousand = 12 hundreds = 123 tens = 1,234 ones". Source right.
- **Real mistake (fact line):** written as a chain of "=" it says 1,234 = 1 thousand, which is false. The book says "1234 *contains* 1 thousand, 12 hundreds...". Fix: "1234 contains 1 thousand, or 12 hundreds, or 123 tens, or 1234 ones".
- **Example differs:** the activity opens 1,000 (1 thousand = 10 hundreds = 100 tens = 1,000 ones), not 1234. The book's key idea (12 hundreds in 1234) never shows. Fix: unbundle 1234 and show the "look left" chart (1|234, 12|34, 123|4, 1234).

### Page 10 (Section 3, Workbook A p18): Decomposing a Number
- Book: 273 = 200 + 70 + 3 (number tree); base-10 blocks: 273 = 100 + 100 + 10 + 10 + 10 + 10 + 10 + 10 + 10 + 1 + 1 + 1; other way: 273 = 50 + 50 + 100 + 73.
- App: tree 200 + 70 + 3 ✓; "another way" 50 + 50 + 100 + 73 ✓; source right.
- **Wording:** app "blocks" view writes "2 × 100, 7 × 10, 3 × 1" (multiplication, not taught yet here); book writes the repeated addition 100 + 100 + 10 + ... Fix: show the long addition in blocks mode.
- **Wording:** app puts the total last ("200 + 70 + 3 = 273"); book puts it first ("273 = 200 + 70 + 3").
- Small visual: "another way" has 4 parts but the tree still draws 3 branches.

### Page 11 (Section 3, Workbook A p20): Comparing Numbers
- Book: symbols table (= is equal to, > is greater than, < is less than). Represent: 132 < 245 with blocks. Place values: 346 vs 179 → 300 > 100 so 346 > 179; 346 vs 379 → 300 = 300, then 40 < 70 so 346 < 379.
- App: fact "346 > 179, but 346 < 379" ✓, starts on 346 vs 379 ✓, source right.
- **Wording:** app reason says "The tens decide it: 4 is less than 7"; book compares values "40 < 70" (and "300 > 100"). Fix: say "40 < 70".
- **Gap:** no symbol-meaning table and no 132 < 245 blocks example.

### Page 12 (Section 4, Workbook A p26): Symmetric Figures / Reflection / Frieze Patterns
- Book: symmetric figure folds into 2 identical parts; fold = line of symmetry (triangle, arrow; a square has more than one line). Reflection = reverse image, same distance from the line of reflection. Frieze = continuous strip with a repeating pattern; can be built by reflection (triangle pattern).
- App: fold a triangle across a line, then build a frieze. Checked the drawing: the mirrored triangle is exactly the same distance from the line ✓. Source right.
- **Gap:** "line of symmetry" (a figure folding onto itself) is not shown; app only shows reflection. The book's first frieze (diamond/circle, repeated without reflection) is also missing.
- Title: app "Symmetry, reflection & friezes" vs page heading "Symmetric Figures" (fine, covers all three headings).

### Page 13 (Section 5, Workbook A p32): Addition and Addition Tables
- Book: 6 + 7 = 13 with labels (terms, addition sign, equals sign, sum). Reversing terms keeps the sum: 6 + 7 = 13, 7 + 6 = 13 = "commutative property of addition". 0-10 two-way addition table, row 6 meets column 7 at 13.
- App: 6 + 7 = 13, 11 × 11 table 0-10 (row + col, all sums correct), "Row 6 and column 7 meet at 13" ✓. Source right.
- **Gap (wording):** the words "terms", "sum" and "commutative property" are only in the summary; the activity never labels the parts of 6 + 7 = 13. Fix: label terms / sum under the big equation.

### Page 14 (Section 5, Workbook A p34): Subtraction and Subtraction Tables
- Book: 16 − 9 = 7 labelled (terms, subtraction sign, equals sign, difference). "You cannot reverse the terms of a subtraction." Subtraction is the inverse of addition: number line 0-20, 7 + 9 = 16 forward, 16 − 9 = 7 back.
- App: 7 + 9 = 16 then "Undo it with subtraction" 16 − 9 = 7 on a 0-20 line ✓. Fact "7 + 9 = 16, so 16 - 9 = 7" ✓. Source right.
- **Resolves the contents question:** the page has no subtraction table in it, only the title. The app missing a table is OK; title rename "Subtraction & inverse operations" is fine.
- Fact line uses a plain hyphen "16 - 9"; the activity uses the proper minus "−". Tiny.

### Page 15 (Section 6, Workbook A p40): Adding Big Numbers
- Book: add ones, tens, hundreds, thousands in that order; if a place sum is more than 9, regroup 10 and carry. Example 1146 + 1237: ones 6 + 7 = 13 → regroup 1 ten, 3 ones left; carry 1 above the tens; answer 2383.
- App: 1146 + 1237 = 2383 ✓, steps "6 + 7 makes 13. Ten ones must regroup." / "Write 3 ones and carry 1 ten." ✓, carry 1 over tens ✓. Source right. **Matches.**
- Style only: app shows "1,146 + 1,237 = 2,383" with commas (see page 7 note).

### Page 16 (Section 6, Workbook A p43): Subtracting Big Numbers
- Book: subtract ones, tens, hundreds, thousands; if not enough, "regroup, or borrow" 10 from the next place. Example 2252 − 1024: can't take 4 ones from 2, regroup 1 ten → 4 tens left, 12 ones; answer 1228.
- App: 2252 − 1024 = 1228 ✓, 5 tens → 4, 2 ones → 12 ✓. Source right. **Matches.**
- **Wording:** app says "exchange one ten"; book says "regroup (borrow)". Fix: use "regroup".

### Page 17 (Section 7, Workbook A p50): Cartesian Planes
- Book: a plane is a 2-D reference system; a point's coordinates = an ordered pair. Always start with the horizontal axis number. Grid 0-7, point A = (5, 2).
- App: grid 0-7, point A = (5, 2) ✓, "horizontal first, vertical second" ✓. Source right. **Matches.**
- **Wording:** app axis labels say "horizontal x" / "vertical y"; the book never uses x and y, it says "Horizontal axis" / "Vertical axis". Fix: drop x/y.
- **Visual:** the book puts points on the grid-line crossings; the app fills a square cell. For the new visuals, plot on the crossings and number the axes 0-7.

### Page 18 (Section 8, Workbook A p56): Missing Terms
- Book: a missing term makes both sides equal. Addition → subtract (inverse): □ + 39 = 69 → 69 − 39 = 30 → check 30 + 39 = 69; 58 + □ = 72 → 72 − 58 = 14 → check 58 + 14 = 72. Subtraction: first term missing → add: □ − 22 = 57 → 57 + 22 = 79 → check 79 − 22 = 57; second term missing → subtract: 49 − □ = 25 → 49 − 25 = 24 → check 49 − 24 = 25.
- App: same four problems, answers 30, 14, 79, 24 ✓. Title "Finding missing terms" ✓. Source right.
- **Real mistake (teaching):** for 49 − □ = 25 the app says "Use the inverse: 49 − 25 = 24", and the wrong-answer hint says "Undo the visible operation". Undoing the subtraction would mean adding (49 + 25 = 74, wrong). The book says: if the *second* term is missing, you *subtract*. Fix: hint per problem, e.g. "The second term is missing, so subtract: 49 − 25".
- **Gap:** the book's step 3 (put the answer back to check) is not shown. Fix: show the check line after a correct answer.

### Page 19 (Section 9, Workbook A p72): Angles / Parallel and Perpendicular Lines
- Book: an angle = 2 straight lines that meet. Right, acute (smaller than a right angle), obtuse (bigger than a right angle). Check with the corner of a book or sheet of paper. Parallel lines never meet (curved lines can be parallel too); perpendicular lines form a right angle.
- App: paper-corner tester, right/acute/obtuse ✓, perpendicular ✓. Source right.
- **Different level:** app fact "Acute < 90°, right = 90°, obtuse > 90°" and the slider shows degrees. The book never uses degrees; it compares with a right angle / paper corner. Fix: "Acute is smaller than a right angle; obtuse is bigger", hide the degree number (or keep it small as extra).
- **Gap:** parallel lines are in the summary but the activity only ever says "perpendicular" / "not perpendicular". Fix: add a parallel pair (and the curved parallel lines).

### Page 20 (Section 10, Workbook A p78): Polygons
- Book: a polygon is a plane figure formed by a closed straight line; classify by number of sides (triangles = 3, quadrilaterals = 4). Convex = no part points inwards; nonconvex = at least one part points inwards (arrow, cross, star, chevron).
- App: triangle, quadrilateral, convex pentagon, nonconvex pentagon; checked the shape points, all have the stated number of sides and only the last has an inward corner ✓. Source right. **Matches.**
- Wording: app says "one part points inward"; book says "at least one part". Book's nonconvex examples have several inward corners (star, cross). Fix: "at least one part points inward" and add a star or cross.

### Page 21 (Section 11, Workbook A p84): Estimating
- Book: "approximately" means about. 4 steps: mark off a sample; estimate it (about 50 gemstones); find how many samples fit (4); calculate 50 + 50 + 50 + 50 = 200. "There are approximately 200 gemstones."
- App: sample about 50, 4 samples, about 200 ✓. Source right.
- **Different method (wording):** app says "multiply" and shows "50 × 4 = 200". The book *adds* the samples (50 + 50 + 50 + 50); multiplication comes later (p23). Fix: show the repeated addition.
- **Visual:** each app quarter draws 20 gems but is labelled "about 50", so a child who counts gets 20. Fix for the new visuals: draw ~50 gems per quarter like the book.

### Page 22 (Section 11, Workbook A p86): Counting Large Collections
- Book: organise in groups of 10 or 100. 743 gold coins = 7 chests (100), 4 bags (10), 3 coins. 10 coins → 1 bag, 10 bags → 1 chest. Table Quantity : Value = 7 : 700, 4 : 40, 3 : 3.
- App: 743, coins → sacks → chests, "700 + 40 + 3 = 743" ✓. Source right. **Numbers match.**
- **Wording:** fact line "7 × 100 + 4 × 10 + 3 = 743" uses multiplication (not taught until p23). Book uses a Quantity / Value table. Fix: "7 chests = 700, 4 bags = 40, 3 coins = 3". Book says "bags", app says "sacks" (fine).

### Page 23 (Section 12, Workbook A p92): The Meaning of Multiplication
- Book: 3 × 6 = 18 labelled (factors, multiplication sign, equals sign, product). 2 × 4 = 8 "2 groups of 4 chests"; 4 × 2 = 8 "4 groups of 2 chests"; reversing factors = commutative property of multiplication. If a factor is 0 the product is 0: 0 × 5 = 0, 5 × 0 = 0.
- App: 2 × 4 = 8, rotate → 4 × 2 = 8 ✓. Source right.
- **Wording:** app says "rows" and "columns"; book says "groups of". Fix: "2 groups of 4".
- **Gap:** the zero rule (0 × 5 = 0, 5 × 0 = 0) is missing, and the app's steppers stop at 1 so it can't be shown. Fix: allow 0 and add the rule to the fact. Also no labels for factors / product.

### Page 24 (Section 12, Workbook A p94): The Meaning of Division
- Book: division finds how many times the divisor is contained in the dividend; also sharing among equal groups; result = quotient. 18 ÷ 3 = 6 labelled (dividend, division sign, divisor, equals sign, quotient). "If you divide 18 bottles into 3 equal groups, there are 6 bottles in each group." Impossible to divide by 0.
- App: 18 ÷ 3 = 6 in 3 boxes ✓, fact includes "division by zero is impossible" ✓. Source right.
- **Real mistake (picture vs answer):** the groups stepper goes 1-6. With 4 groups the app writes "4 r 2 … 2 counters are left over", but the boxes are filled 5, 5, 5, 3 (it rounds up per box), so the picture shows no leftovers and unequal groups. Same for 5 groups (4, 4, 4, 4, 2). Fix: put quotient in each box and show the remainder counters apart. (Remainders are not in the book at all, so simplest fix is to only allow 1, 2, 3, 6 groups.)
- Gap: no labels for dividend / divisor / quotient.

### Page 25 (Section 13, Workbook A p100): Fractions
- Book: a fraction = one or more parts of a whole; whole = single object or collection. Pizza + collection for 1/4 (quarter), 1/2 (half), 1/5 (fifth), 2/3 (two thirds). Numerator = number of parts to consider; denominator = total number of equal parts; the fraction is named from the denominator. The whole is always divided into equal parts.
- App: fact "1/4 is one of four equal parts; 2/3 is two of three" ✓, starts on 1/4 ✓, bar + collection. Source right.
- **Text doesn't match the picture:** curriculum "visual" line says "A circular whole", but the activity draws a straight bar, not a circle/pizza. Fix: draw a circle (pizza) like the book, or change the text.
- **Gap:** the names quarter / half / fifth / two thirds are not shown. Fix: show the name under the fraction.

### Page 26 (Section 13, Workbook A p105): Comparing Fractions
- Book: the wholes must be the same; same wholes + same denominator → compare numerators. 1/4 < 2/4 shown with bars and with a collection of 4 circles.
- App: 1/4 < 2/4 with two equal bars ✓, fact ✓, source right. **Matches.**
- Gap (small): the book's second picture (collection of circles) is not shown.

### Page 27 (Section 14, Workbook A p110): Decimal Numbers
- Book: decimal = whole part + fractional part, separated by a decimal point. First digit right of the point = tenths (1/10, 10 times smaller than 1); second = hundredths (1/100). Chart Whole Part (H, T, O) / Fractional Part (tenths, hundredths). Examples: 3.11 = 3 11/100 "three and eleven hundredths"; 2.4 = 2 4/10 "two and four tenths"; 231.11 with blocks and magnifying glass = 231 11/100 "two hundred thirty-one and eleven hundredths".
- App: 231.11 = 200 + 30 + 1 + 0.1 + 0.01 ✓, magnifier ✓, source right.
- **Visual:** app draws the decimal point in front of the tenths digit (".1"); the book writes it after the ones digit ("1."). Fix: put the point in the ones column like the book.
- **Wording:** magnifier reads "1 tenths = 0.1", "1 hundredths = 0.01" (should be "1 tenth", "1 hundredth").
- **Gap:** 3.11 and 2.4 examples, the fraction form (231 11/100) and the "you say" words are missing.

### Page 28 (Section 14, Workbook A p113): Coins and Decimal Numbers
- Book: 10¢ = 1/10 of $1 → 10¢ or $0.10; 5¢ = 5/100 of $1 → 5¢ or $0.05. $1.45 = one $1 coin (ones), four 10¢ (tenths: 4), one 5¢ (hundredths: 5); "a dollar and forty-five cents". With cents, write to the hundredths: $3.40, not $3.4. (Coins are Canadian: loonie, dimes, nickel.)
- App: target $1.45 with $1, 10¢, 5¢ coins into ones / tenths / hundredths ✓; fact includes "$3.40, not $3.4" ✓. Source right. **Matches.**
- Wording: fact "4 × $0.10" uses ×; book just shows 4 coins in the tenths column. The 10¢ = 1/10 and 5¢ = 5/100 lines and the spoken "a dollar and forty-five cents" are missing.
- For new visuals: book uses Canadian coin pictures (loonie with "$1", 10¢, 5¢).

### Page 29 (Section 15, Workbook B p4): Units of Measure for Length
- Book: metre = basic unit; 1 m = 10 dm = 100 cm = 1000 mm. Pick the unit for the object: ladybug in mm, fish in cm, snake in m. Convert with a m/dm/cm/mm table by moving the decimal point after the digit in the target unit's column; sometimes add 0s. 124 cm = 1240 mm = 12.4 dm = 1.24 m. "If you can't see the decimal point, it's at the end."
- App: 124 cm → 1.24 m, 12.4 dm, 124 cm, 1240 mm ✓; fact ✓; source right. **Numbers match.**
- Wording: app explains "moving one column right multiplies by 10"; the book's rule is "move the decimal point to after the digit in the unit's column". Fix: use the book's rule, show the added 0 for mm.
- **Gap:** "which unit for what" (ladybug mm, fish cm, snake m) is missing.

### Page 30 (Section 15, Workbook B p8): Perimeter
- Book: perimeter = total length of the outer edges; add the lengths of all sides. 4 cm by 2 cm rectangle: 4 + 2 + 4 + 2 = 12, "The perimeter of this figure is 12 cm."
- App: 4 × 2 rectangle, "4 + 2 + 4 + 2 = 12 cm" ✓, source right. Practice perimeter question answers 2 × (w + h) and its hint adds all four sides ✓. **Matches.**

### Page 31 (Section 16, Workbook B p12): Tables / Bar Graphs
- Book: a table has a title, column/row titles, data. Table "Number of Animals at Little Friends Pet Shop", columns "Type of Animal" / "Number of Animals": Cats 5, Dogs 2, Fish 8. A bar graph has a title, vertical and horizontal axis titles ("Number of Animals", "Type of Animal"), ordered markings 0-8, same-width evenly spaced bars.
- App: Cats 5, Dogs 2, Fish 8 ✓ in table and bars; source right. **Numbers match.**
- **Wording:** app table title "Animals at the pet shop", headers "Animal" / "Quantity". Book: "Number of Animals at Little Friends Pet Shop", "Type of Animal" / "Number of Animals". Fix: copy the book's titles.
- **Gap:** the bar graph has no title, no axis titles and no 0-8 scale, which are exactly the parts the page teaches. Fix: add them.

### Page 32 (Section 17, Workbook B p18): Prisms and Pyramids
- Book: a solid can have plane (flat) faces, curved surfaces, or both (cylinder: 2 plane faces + curved surface). Prisms and pyramids have only plane faces; tell apart by faces, edges, vertices. Prism: 2 identical parallel bases joined by 4-sided polygons. Pyramid: 1 base, other faces triangles meeting at the same vertex. Edge = segment where 2 faces meet; vertex = point where at least 2 edges meet. Examples: square, rectangular, triangular prism; triangular, square pyramid.
- App: prism / pyramid switch, highlight bases, faces, edges, vertices ✓. Source right.
- **Wording:** fact "pyramid = 1 base + 1 apex"; the book never says "apex", it says the triangles meet "at the same vertex". Fix: "1 base + triangles meeting at one vertex".
- **Gap:** the cylinder (plane vs curved), the edge/vertex definitions and the 5 named example solids are not in the app. The app never counts faces / edges / vertices.

### Page 33 (Section 17, Workbook B p21): Nets of Prisms and Pyramids
- Book: a net shows all faces of a solid laid flat; helps see which plane figures make the solid; a solid can have several nets. Triangular prism = 2 triangles + 3 rectangles (net: 3 rectangles in a row, a triangle on top and bottom). Triangular pyramid = 4 triangles (net: big triangle split into 4).
- App: fact "Triangular prism net = 2 triangles + 3 rectangles; triangular pyramid net = 4 triangles" ✓. Source right.
- **Real mistake (count on screen):** `renderNet` draws four square faces (f1, f2, f3, **f4**) plus 2 triangles, while the label says "3 rectangle faces". expanded.css only positions f1-f3, so f4 sits loose at the top-left of the stage, a 4th face. Fix: remove f4. Also the faces are 90 × 90 squares, not rectangles; make them taller than wide like the book.
- **Gap:** the triangular pyramid net (4 triangles) is in the fact line but never shown.

### Page 34 (Section 18, Workbook B p26): Multiplication and Multiplication Tables
- Book: multiplication finds the product of factors; read × as "multiplied by" or "times" ("3 times 4"). 3 × 4 = 12 labelled; 3 × 4 = 12 or 4 × 3 = 12. 0-10 multiplication table, both 3,4 and 4,3 cells circled at 12.
- App: 3 × 4 = 12 ✓, 0-10 table (row × col, all products correct) ✓. Practice "times" question (2-9 × 2-9) answers correctly ✓.
- **Real mistake (source):** app says "Workbook B, p. 24"; the book page says **Workbook B, page 26**. Fix: change to p. 26.
- Gap (small): the book circles both 3 × 4 and 4 × 3 to show they match; the app only lights one cell.

### Page 35 (Section 18, Workbook B p28 + Section 19, Workbook B p34): Division / Area
- Book, Division: separate a quantity (dividend) into equal groups (divisor); result = quotient; ÷ read "divided by". 16 ÷ 8 = 2 labelled; "16 marbles into 8 equal groups, 2 marbles per group". Division is the inverse of multiplication: 16 ÷ 8 = 2 and 2 × 8 = 16.
- Book, Area: area = measure of the surface of a closed plane figure; choose a unit, count how many times it covers the surface. 3 by 2 rectangle = 6 square units; an odd-shaped figure = 13 square units.
- App: one lesson for both, source "Workbook B, pp. 28 & 34" ✓, fact "16 ÷ 8 = 2 ↔ 2 × 8 = 16; a 2 × 3 rectangle has area 6" ✓.
- **Text doesn't match the activity:** the "visual" line says "the related multiplication and division facts update together", but the activity only shows "2 × 3 = 6 square units"; no division fact appears and 16 ÷ 8 is never shown. Fix: add the division line (e.g. 6 ÷ 3 = 2) or the 16 marbles in 8 groups.
- **Wording:** app gives area as "2 × 3"; the book counts square units (no multiplying). Gap: the 13-square-unit odd shape (shows area isn't only rectangles).

### Page 36 (Section 20, Workbook B p40): Equivalent Fractions
- Book: equivalent fractions show the same value of a whole (single thing or collection); wholes must be the same. Single whole: 1/3, 2/6, 4/12 bars. Collection: 12 stars grouped as 1/3, 2/6, 4/12. "The fractions 1/3, 2/6 and 4/12 are equivalent."
- App: 1/3 = 2/6 = 4/12 on three equal strips ✓, source right. **Matches.**
- Gap (small): the 12-star collection version is missing.

### Page 37 (Section 21, Workbook B p58 + p60): Adding / Subtracting Decimal Numbers
- Book: add/subtract like natural numbers; line up place values, line up decimal points, carry the point into the result; you can add a 0 in the tenths or hundredths place. Adding: 2.32 + 4.86 = 7.18; 12.4 + 7.5 = 19.9; 6.76 + 5.5(0) = 12.26; 23(.0) + 5.4 = 28.4. Subtracting: 24.3 − 12.1 = 12.2; 4.31 − 2.19 = 2.12; 13.7(0) − 10.46 = 3.24; 25(.0) − 4.8 = 20.2.
- App: 2.32 + 4.86 = 7.18 ✓, 4.31 − 2.19 = 2.12 ✓, 25.0 − 4.8 = 20.2 ✓. Source "pp. 58 & 60" ✓. **All answers right.**
- **Visual:** the app pads every number to hundredths, so 25.0 − 4.8 shows as "25.00 − 4.80 = 20.20"; the book only adds the one 0 it needs (25.0, answer 20.2). Fix: pad only to the longest number in that example.
- Gap: 5 of the book's 8 examples are missing, incl. the ones that add a 0 (6.76 + 5.50, 23.0 + 5.4, 13.70 − 10.46), and the regroup/carry marks.

### Page 38 (Section 22, Workbook B p66): Multiplication
- Book: 53 × 2 = 106 labelled (factors, product). Use base-10 blocks: (1) show 53 twice; (2) add the ones, then the tens, regroup when over 9 ("regroup 10 tens as 1 hundred"); (3) product 53 × 2 = 106 (chart 1 | 0 | 6). Reminder: small cube = 1, rod = 10, flat = 100.
- App lesson 38 "Two-digit multiplication": example 4 × 23 = 80 + 12 = 92 in a split area box, source "Workbook B, p. 68".
- **Real mistake (example + source):** the book page is **Workbook B p66** with **53 × 2 = 106** using blocks and regrouping. The app uses 4 × 23 = 92 (not on this page) and says p. 68. (Page 39 checked next to see if 4 × 23 / p68 is there.)
- **Different method:** book = copy the number and add with blocks, regrouping; app = split into tens and ones (partial products). Fix: start on 53 × 2 with two copies of 53 in blocks, regroup 10 tens into 1 hundred.

### Page 39 (Section 23, Workbook B p74): Rounding Natural Numbers
- Book: rounding = replace a number with a close value (nearest ten, hundred, thousand). 583 is closer to 580 than 590 → 580 (line 570-590). 1234 closer to 1200 than 1300 → 1200 (line 1200-1400). 13 500 is equally far from 13 000 and 14 000 → round to the bigger: 14 000.
- App fact "583 → 580; 1,234 → 1,200; 13,500 → 14,000" ✓; the 100 and 1000 buttons load 1234 and 13500 and round them right ✓; midpoint rounds up ✓. Source right.
- (Page 38 follow-up: this page is p74, so Workbook B p68 / 4 × 23 has no photo; the app's lesson 38 still doesn't match book page 38.)
- **Real mistake (bug):** the lesson should open on 583, but `renderRounding` clamps the value to between `place` and `place × 20` = 10-200, so it opens on **"200 rounds to 200"**. Pressing the "10" button loads 183, not 583. The book's first example never appears. Fix: let the slider range fit the example (e.g. 500-700 for tens) and load 583 on the "10" button.
- **Style:** book writes 13 500 / 14 000 with a space; app writes 13,500 / 14,000.
- Practice "round to the nearest ten" question: picks 11-98, skips numbers ending in 5, answers correctly ✓ (never tests the midpoint rule).

### Page 40 (Section 24, Workbook B p80): Even and Odd Numbers
- Book: even = can be shown in groups of 2; ends in 0, 2, 4, 6, 8 (16 marbles = 8 pairs). Odd = can't, there is always a remainder; ends in 1, 3, 5, 7, 9 (21 = 10 pairs + 1 remainder).
- App: starts on 16 (8 pairs, even) ✓; stepper 0-30 reaches 21 (10 pairs + 1 left over) ✓; endings fact ✓. Source right. **Matches.**
- Wording: app says "left over"; book uses the word "remainder". Fix: say "remainder". Could open the odd example on 21 like the book.

### Page 41 (Section 24, Workbook B p82): Composite and Prime Numbers
- Book: composite = can be shown in equal groups of 2 or more objects (9 = 3 equal groups of 3). Prime = can't, there is always a remainder (7 in 2s → remainder; 7 in 3s → remainder). 0 and 1 are neither.
- App: starts on 9 → composite (3 × 3) ✓; 7 → prime ✓; 0 and 1 "neither" ✓. Source right. **Classification is always right** (checked the factor code).
- **Wording:** app summary "form equal groups in more than one way" and it lists "1 × 9" as an arrangement. The book's rule is "equal groups of 2 or more", and for a prime it shows the failed tries with a remainder. Fix: use the book's sentence, hide the 1 × n row, and for a prime show the tries with the leftover marble.

### Page 42 (Section 25, Workbook B p86): Number Patterns
- Book: a number pattern follows a rule. 15, 25, 35, 45, 55, 65 (rule + 10, "skip counting by 10s"); 100, 200, 175, 275, 250, 350, 325 (rule + 100, − 25); 2, 4, 8, 16, 32 shown as growing squares (rule × 2).
- App: exactly these three patterns and rules ✓, source right. **Matches.**
- Gap (small): the × 2 pattern's growing-rectangle picture, and "skip counting by 10s".

### Page 43 (Section 26, Workbook B p92): Units of Measure for Time / Telling Time
- Book: 1 year = 365 days or 12 months; 1 month = 30 or 31 days (February 28); 1 week = 7 days; 1 day = 24 hours; 1 hour = 60 minutes; 1 minute = 60 seconds; leap year every 4 years = 366 days, extra day February 29. Clock: little hand = hour (h), big hand = minutes (min), second hand = seconds (s). Example "10 h 20 min 5 s in the morning (a.m.) or the evening (p.m.)"; digital 10:20 (hours : minutes). The dial also shows 13-24 and minute numbers round the edge.
- App: clock at 10:20:05 ✓, fact "1 hour = 60 minutes; 1 minute = 60 seconds" ✓, source right.
- **Wording:** app says "short hand / long hand / thin hand"; book says "little hand / big hand / second hand". Fix: use the book's words.
- **Gap:** year / month / week / day facts, leap year, a.m./p.m., the "10 h 20 min 5 s" way of writing time, and the 13-24 and minute numbers on the dial.

### Page 44 (Section 26, Workbook B p96): Volume / Capacity / Mass
- Book: volume = space taken up by a solid (length, width, height) — a car has a greater volume than a motorcycle. Capacity = amount of material (often liquid) an object can contain — a jug has a greater capacity than a glass. Mass = amount of matter; greater mass = heavier — an adult *usually* has a greater mass than a child.
- App: car/motorcycle → volume, jug/glass → capacity, adult/child → mass ✓, source right. **Matches.**
- Wording: app says "The adult contains more matter"; the book says "usually" (a big child can be heavier than a small adult). Fix: add "usually".

### Page 45 (Section 27, Workbook B p100): Probability
- Book: results can depend on chance; an outcome is impossible, possible or certain, shown on a probability line (red marbles in a jar: none red = impossible, some = possible, all red = certain). A possible outcome can be less likely, as likely or more likely than another ("than a green marble").
- App: red/blue marble bag, likelihood line impossible → certain, labels impossible / less likely / as likely / more likely / certain ✓. Source right.
- **Different level:** fact "impossible (0) to certain (1)" — the book never uses 0 and 1. Fix: drop the numbers.
- **Wording:** book's second colour is green (app blue); the app never says the word "possible", which is one of the three main words. Fix: show "possible" and then the less / as / more likely compared with the other colour.

### Page 46 (Section 27, Workbook B p103): Combinations
- Book: arrange all possible outcomes in a table. Animals (squirrel, blue jay, chipmunk — pictures only) × Kinds of Nuts (pistachio, cashew, almond, hazelnut): 3 animals and 4 kinds of nuts → 12 possible combinations.
- App: Squirrel, Bird, Chipmunk × Pistachio, Cashew, Almond, Hazelnut, 12 cells ✓, source right. **Matches.**
- Visual: cells show letters "(S, P)"; chipmunk + cashew shows "(C, C)", which can't be told apart. Fix: use the pictures like the book (animal + nut in each cell).

### Page 47 (Section 28, Workbook B p108): Equivalent Expressions
- Book: equivalent expressions = 2 or more series of operations with the same result. 25 joined to 15 + 10, 20 + 5, 5 × 5, 25 + 0, 30 − 5. Put = between two to make an equality: 15 + 10 = 20 + 5.
- App: target 25 with the same five ✓ plus two extras: "10 + 10" (= 20, the wrong one to catch) and "50 ÷ 2" (= 25, not in the book). All values correct ✓. Source right. **Matches.**
- Gap (small): the "equality" idea (15 + 10 = 20 + 5) isn't shown when two tiles are picked.

### Page 48: Notes
- Book: a blank blue-grid "Notes" page, no lesson.
- App: "Scratchpad" drawing page on a blue grid ✓. **Matches.** Title could be "Notes" like the book.

### Page 49 (Mental Arithmetic, Addition and Subtraction): The Effect of 0
- Book: table 0-10 with four columns: "+ 0" (n + 0 = n), "Commutative Property" (0 + n = n), "− 0" (n − 0 = n), "Inverse Operation" (n − n = 0). Row 0 leaves the commutative and inverse cells blank.
- App: one row at a time for n = 0-10: n + 0, 0 + n, n − 0, n − n, all correct ✓. Starts on 5.
- Wording: column names "add zero / commute / subtract zero / inverse" vs book "+ 0 / Commutative Property / − 0 / Inverse Operation". Fix: use the book's headings.
- Visual: book shows the whole 11-row table at once with the chosen row highlighted would match better.

### Page 50 (Mental Arithmetic): 1 More, 1 Less
- Book: rows n = 0-9. Columns "+ 1" (n + 1), "Commutative Property" (1 + n), "− 1" ((n + 1) − 1 = n, e.g. 1 − 1 = 0, 10 − 1 = 9), "Inverse Operation" ((n + 1) − n = 1, e.g. 1 − 0 = 1, 10 − 9 = 1). Row 1 leaves the commutative and inverse cells blank (same fact twice).
- App: n + 1, 1 + n, n − 1, (n + 1) − n = 1. Starts on 4. Stepper 0-10.
- **Real mistake (wrong answer):** `mentalFacts("one")` writes the "one less" line as `n − 1 = max(0, n − 1)`, so at n = 0 it shows **"0 − 1 = 0"**, which is false. Fix: use the book's column, (n + 1) − 1 = n (never goes below 0), or hide the line at 0.
- **Different fact:** the book's "− 1" column takes 1 from the *bigger* number (5 − 1 = 4 in the row for 4 + 1 = 5); the app takes 1 from n itself (4 − 1 = 3). Fix: match the book's row.
- Range: book rows stop at 9 (9 + 1 = 10); app goes to 10 (10 + 1 = 11). Minor.

### Page 51 (Mental Arithmetic): 2 More, 2 Fewer
- Book: rows n = 0-8. "+ 2" (n + 2), "Commutative Property" (2 + n), "− 2" ((n + 2) − 2 = n, e.g. 2 − 2 = 0), "Inverse Operation" ((n + 2) − n = 2, e.g. 2 − 0 = 2). Row 2 blanks the repeats.
- App: n + 2, 2 + n, n − 2, (n + 2) − n = 2. Starts on 3. Stepper 0-10. Fact "(N + 2) - 2 = N" matches the book, but the activity doesn't use it.
- **Real mistake (wrong answer):** "two fewer" is `n − 2 = max(0, n − 2)`, so n = 0 shows **"0 − 2 = 0"** and n = 1 shows **"1 − 2 = 0"**. Fix: use (n + 2) − 2 = n like the book (and like the app's own fact line).
- Range: book stops at 8 + 2 = 10; app goes to 10 + 2 = 12. Minor.

### Page 52 (Mental Arithmetic): Doubles
- Book: rows 0-10, "Double" (n + n) and "Inverse Operation" (2n − n = n): 0 + 0 = 0 … 10 + 10 = 20; 0 − 0 = 0 … 20 − 10 = 10.
- App: n + n = 2n and 2n − n = n for n = 0-10, all correct ✓. Starts on 7 (7 + 7 = 14, 14 − 7 = 7 ✓). **Matches.**
- Wording: second label "halve" vs book "Inverse Operation".

### Page 53 (Mental Arithmetic): Doubles + 1 and − 1
- Book: four columns. "Double + 1": n + (n + 1) (1 + 2 = 3 … 9 + 10 = 19) with its inverse (3 − 2 = 1 … 19 − 10 = 9). "Double − 1": (n + 1) + n (2 + 1 = 3 … 10 + 9 = 19) with its inverse (3 − 1 = 2 … 19 − 9 = 10). Tip: "2 + 3 is the same as 2 + 2 + 1."
- App: "near double n + (n + 1)", "double first n + n + 1", "result 2n + 1". Starts on 6 (6 + 7 = 13 ✓). All sums correct ✓. Fact line matches the tip ✓.
- **Gap:** the title says "plus or minus one" but only the + 1 side is shown; the "Double − 1" column (7 + 6 = 13) and both inverse subtractions (13 − 7 = 6, 13 − 6 = 7) are missing. Fix: add the reversed sum and the two inverse lines.

## Done
All photos (pages 9-53) checked 2026-09-29. Pages 54-60 have no photos (see contents notes above).
