# ===============================
# Smart Local Tours - Sevlievo Audio Guide
# Generates MP3 files for 3 landmarks
# Voice: Calm, female, neutral accent (Google TTS)
# ===============================

from gtts import gTTS
import os

# --- Texts for the tour stops ---
texts = {
    "Hotalich_Fortress": """
Welcome to the Medieval Fortress Hotalich, one of Bulgaria's best-preserved historical sites.
Located on a hill near Sevlievo, Hotalich dates back to the tenth century.
As you walk through the ruins, imagine the life of the medieval town — its stone walls, churches, and workshops.
Excavations began in 1979, and much of the site has been beautifully restored.
Enjoy the panoramic views over the valley as you explore this symbol of Bulgaria's early past.
""",

    "Clock_Tower_Museum": """
This is the Clock Tower, the oldest public building in Sevlievo, built in 1779.
Its elegant octagonal design and carved stone details make it a true local landmark.
Just nearby, you'll find the Town History Museum, housed in the Hadjistoyan School from 1844.
Inside, you can explore Sevlievo's past — from ancient artifacts to stories of the Bulgarian National Revival.
""",

    "Art_Gallery": """
Welcome to the Sevlievo Art Gallery, named after the brothers Asen and Iliya Peykov.
The gallery is located in a beautiful nineteenth-century building designed by Austrian architect Josef Schnitter.
Inside, you'll find inspiring works of Bulgarian art — paintings, sculptures, and exhibitions that celebrate the region's creative spirit.
It's a peaceful and cultural stop on your tour of Sevlievo.
"""
}

# --- Create MP3 files for each location ---
output_dir = "Sevlievo_Audio_Guide"
os.makedirs(output_dir, exist_ok=True)

for name, text in texts.items():
    print(f"Generating audio for: {name} ...")
    tts = gTTS(text=text, lang='en', slow=False)
    file_path = os.path.join(output_dir, f"{name}.mp3")
    tts.save(file_path)
    print(f"Saved: {file_path}")

print("\n✅ All audio files created successfully!")
print(f"Check the folder: {os.path.abspath(output_dir)}")


