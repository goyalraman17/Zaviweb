with open("components/Navigation.tsx", "r") as r:
    c = r.read()

target = 'href: "/contact"'
insert_str = '{ href: "/about", label: "About Zavi" },\n              '
if target in c and '"/about"' not in c and "'/about'" not in c:
    c = c.replace('{ href: "/contact"', insert_str + '{ href: "/contact"')
    with open("components/Navigation.tsx", "w") as w:
        w.write(c)
