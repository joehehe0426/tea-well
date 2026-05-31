import re

# Fix CSS
with open('C:/Users/User/Documents/tea_well/css/style.css', 'r', encoding='utf-8') as f:
    css = f.read()

lines = css.split('\n')
for i, line in enumerate(lines):
    if 'logo::after' in line:
        if i+1 < len(lines) and 'content:' in lines[i+1]:
            lines[i+1] = "    content: '茶井';"
            print(f'Fixed CSS line {i+2}')
            break

css = '\n'.join(lines)
with open('C:/Users/User/Documents/tea_well/css/style.css', 'w', encoding='utf-8') as f:
    f.write(css)
print('CSS done')

# Fix JS
with open('C:/Users/User/Documents/tea_well/js/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

pattern = r"const logoPool = \[.*?\];"
replacement = """const logoPool = [
    'logo.jpeg',
    'images/smoothie/芝士皇芒.jpg',
    'images/milk-foam-tea/奶蓋黑烏龍.jpg',
    'images/fresh-milk/黑糖珍珠鮮奶.jpg',
    'images/refreshing/水果茶四季春.jpg',
    'images/milk-tea/珍珠奶茶.jpg',
    'images/fresh-milk/芝士草莓奶.jpg'
];"""

js = re.sub(pattern, replacement, js, flags=re.DOTALL)
js = js.replace("img.alt = '???????\\?M???? Tea Well';", "img.alt = '茶井奶蓋專門店 Tea Well';")

with open('C:/Users/User/Documents/tea_well/js/script.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('JS done')

# Verify
with open('C:/Users/User/Documents/tea_well/css/style.css', 'r', encoding='utf-8') as f:
    c = f.read()
print(f'CSS has 茶井: {"茶井" in c}')

with open('C:/Users/User/Documents/tea_well/js/script.js', 'r', encoding='utf-8') as f:
    j = f.read()
print(f'JS has 芝士皇芒: {"芝士皇芒" in j}')
print(f'JS has 奶蓋黑烏龍: {"奶蓋黑烏龍" in j}')
