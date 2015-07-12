# SECURITIplatform
# written by John Martinelli (johnnymartinelli@gmail.com)

# load our standard libraries

import requests

# load our internal-use-only libraries

import config # loads our configuration
import recon # loads our reconaissance class

# reconnaisance/information gathering 

reconWorker = recon.reconaissance() # instantiate our recon toolkit

# GET PLACE DETAILS FROM Google Places API

placeID = "ChIJ974-UVGx2YgRzO_knHqgjJY" # test placeID with bicycle shop
placeDetails = reconWorker.getDetails(config.GoogleAPIKey, config.outputType, placeID)

