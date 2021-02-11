import os

rootDir = os.path.join(os.getcwd(), "characters")
for filename in os.listdir(rootDir):
    fullPath = os.path.join(os.getcwd(), "characters", filename)
    if os.path.isdir(fullPath):
        print("Parsing characters for: " + filename)

        character_file_name = os.path.join(os.getcwd(), "characters", filename, "character_list.js")
        character_file = open(character_file_name, 'w')
        character_file.write("characterNameMap.set('" + filename + "', [\n")
        for character in os.listdir(fullPath):
            character_file.write("  '" + character.split('.')[0] + "',\n")
        character_file.write("]);\n")
        character_file.close()
