def micrRecognition(path):
    from PIL import Image
    col = Image.open(path)
    gray = col.convert('L')

    import numpy as np
    bw = np.asarray(gray).copy()
    bw[bw < 128] = 0
    bw[bw >= 128] = 255


    imfile = Image.fromarray(bw)
    # imfile = Image.fromarray(255-bw)  #shift the colors (black bakgrnd and white fonts for contouring)
    # imfile.show("BOCBinrized.png",imfile)
    imfile.save("BOCBinrized.png")

    import cv2
    import numpy as np
    import operator
    import os
    from collections import OrderedDict

    MIN_CONTOUR_AREA = 20

    RESIZED_IMAGE_WIDTH = 20
    RESIZED_IMAGE_HEIGHT = 30

    #################################
    class ContourWithData():

        # member variables ############################################################################
        npaContour = None
        boundingRect = None
        intRectX = 0
        intRectY = 0
        intRectWidth = 0
        intRectHeight = 0
        fltArea = 0.0

        def calculateRectTopLeftPointAndWidthAndHeight(self):
            [intX, intY, intWidth, intHeight] = self.boundingRect
            self.intRectX = intX
            self.intRectY = intY
            self.intRectWidth = intWidth
            self.intRectHeight = intHeight

        def checkIfContourIsValid(self):
            if self.fltArea < MIN_CONTOUR_AREA: return False
            return True

    ###################################################################################################

    def main():
        strFinalString = ""
        allContoursWithData = []
        validContoursWithData = []

        try:
            npaClassifications = np.loadtxt("GenDataTrainedInput1ClassificationsInput.txt", np.float32)                  # read in training classifications
        except:
            print "error, unable to open classifications.txt, exiting program\n"
            os.system("pause")
            return
        # end try

        try:
            npaFlattenedImages = np.loadtxt("GenDataTrainedInput1FlattenedImagesInput.txt", np.float32)                 # read in training images
        except:
            print "error, unable to open flattened_images.txt, exiting program\n"
            os.system("pause")
            return
        # end try

        npaClassifications = npaClassifications.reshape((npaClassifications.size, 1))       # reshape numpy array to 1d, necessary to pass to call to train

        kNearest = cv2.ml.KNearest_create()                   # instantiate KNN object

        kNearest.train(npaFlattenedImages, cv2.ml.ROW_SAMPLE, npaClassifications)

        imgTestingNumbers = cv2.imread("BOCBinrized.png")

        if imgTestingNumbers is None:
            print "error: image not read from file \n\n"
            os.system("pause")
            return
        # end if

        imgGray = cv2.cvtColor(imgTestingNumbers, cv2.COLOR_BGR2GRAY)
        imgBlurred = cv2.GaussianBlur(imgGray, (5,5), 0)


        imgThresh = cv2.adaptiveThreshold(imgBlurred,
                                          255,
                                          cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
                                          cv2.THRESH_BINARY_INV,
                                          11,
                                          2)

        imgThreshCopy = imgThresh.copy()

        imgContours, npaContours, npaHierarchy = cv2.findContours(imgThreshCopy,             # input image, make sure to use a copy since the function will modify this image in the course of finding contours
                                                     cv2.RETR_EXTERNAL,         # retrieve the outermost contours only
                                                     cv2.CHAIN_APPROX_SIMPLE)   # compress horizontal, vertical, and diagonal segments and leave only their end points


        for npaContour in npaContours:                             # for each contour
            contourWithData = ContourWithData()
            contourWithData.npaContour = npaContour
            contourWithData.boundingRect = cv2.boundingRect(contourWithData.npaContour)
            contourWithData.calculateRectTopLeftPointAndWidthAndHeight()
            contourWithData.fltArea = cv2.contourArea(contourWithData.npaContour)
            allContoursWithData.append(contourWithData)
        # end for

        for contourWithData in allContoursWithData:
            if contourWithData.checkIfContourIsValid():
                validContoursWithData.append(contourWithData)
            # end if
        # end for

        validContoursWithData.sort(key = operator.attrgetter("intRectX"))

        for contourWithData in validContoursWithData:            # for each contour

            cv2.rectangle(imgTestingNumbers,
                          (contourWithData.intRectX, contourWithData.intRectY),
                          (contourWithData.intRectX + contourWithData.intRectWidth, contourWithData.intRectY + contourWithData.intRectHeight),
                          (0, 255, 0),              # green
                          1)                        # thickness

            imgROI = imgThresh[contourWithData.intRectY : contourWithData.intRectY + contourWithData.intRectHeight,
                               contourWithData.intRectX : contourWithData.intRectX + contourWithData.intRectWidth]

            imgROIResized = cv2.resize(imgROI, (RESIZED_IMAGE_WIDTH, RESIZED_IMAGE_HEIGHT))

            npaROIResized = imgROIResized.reshape((1, RESIZED_IMAGE_WIDTH * RESIZED_IMAGE_HEIGHT))

            npaROIResized = np.float32(npaROIResized)

            retval, npaResults, neigh_resp, dists = kNearest.findNearest(npaROIResized, k = 1)

            strCurrentChar = str(chr(int(npaResults[0][0])))

            strFinalString = strFinalString + strCurrentChar
        # end for

        # cv2.imshow("imgTestingNumbers", imgTestingNumbers)
        # cv2.waitKey(0)

        cv2.destroyAllWindows()

        print (strFinalString)
        #########################
    if __name__ == "__main__":
        main()
    # end if
    return
import sys

param = sys.argv[1]
micrRecognition(param)
