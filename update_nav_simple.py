with open("components/Navigation.tsx", "r") as r:
    content = r.read()

target = 'href: "https://x.com/zavivoice"'
if target in content and '"/about"' not in content and "'/about'" not in content:
    content = content.replace(target, "href: '/about', label: 'About Zavi' },\n              { " + target)
    with open("components/Navigation.tsx", "w") as w:
        w.write(content)
        print("Updated navigation successfully.")
