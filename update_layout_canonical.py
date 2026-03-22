import re

with open("app/layout.tsx", "r") as f:
    code = f.read()

# Remove the line `canonical: '/',`
new_code = re.sub(r"\s*canonical:\s*['\"]/['\"],", "", code)

with open("app/layout.tsx", "w") as f:
    f.write(new_code)
