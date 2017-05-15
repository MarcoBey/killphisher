BG_SOURCES = perceptualLibrary/killphisher_hashes.js\
	perceptualLibrary/hash_encoding.js\
	perceptualLibrary/perceptual_background.js

CS_SOURCES = externalCode/jquery/jquery-1.12.4.min.js\
	perceptualLibrary/image_search.js\
	utils.js\
	content.js

CHECK_SOURCES = perceptualLibrary/killphisher_hashes.js

BACKGROUND = js/bg.js
CONTENT = js/cs.js

#all: check $(BACKGROUND) $(CONTENT)
all: $(BACKGROUND) $(CONTENT)

$(BACKGROUND): $(BG_SOURCES)
	cat $^ > $@

$(CONTENT): $(CS_SOURCES)
	cat $^ > $@

check: $(BG_SOURCES) $(CS_SOURCES)
	eslint $(CHECK_SOURCES)

clean:
	rm $(BACKGROUND) $(CONTENT)
