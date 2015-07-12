# SECURITIplatform
# written by John Martinelli

import config # loads our configuration
import recon # loads our reconaissance class

# GET PLACE DETAILS FROM Google Places API

reconWorker = recon.reconaissance() # instantiate our recon toolkit

placeID = ""
placeDetails = reconWorker.getDetails(config.GoogleAPIKey, placeID)

