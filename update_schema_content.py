with open("lib/schemaData.faqSchema", "w") as f:
     pass # Not doing separatefile anymore.
 
with open("app/layout.tsx", "r") as fcontent:
     lines = fcontent.readlines()

output = []
skip = False
for line in lines:
     if "canonical" in line and "/" in line:
          print("found canonical block to delete!")
          continue 
     output.append(line)    

with open("content2.txt", "w") as foutr:
     foutr.writelines(output)

print(len(output),len(lines))
