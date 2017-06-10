# final date
from PIL import Image


def dateRecognitionAndVerification(path):

    col = Image.open(path) # convert the image to *greyscale*
    gray = col.convert('L')

    # Let numpy do the heavy lifting for converting pixels to pure black or white

    import numpy as np

    bw = np.asarray(gray).copy()

    # Pixel range is 0...255, 256/2 = 128

    bw[bw < 128] = 0    # Black    correct code 2 lines
    bw[bw >= 128] = 255 # White

    # Now we put it back in Pillow/PIL land
    imfile = Image.fromarray(bw)  #white backgroud and black fonts
    # imfile = Image.fromarray(255-bw)  #shift the colors (black bakgrnd and white fonts for contouring)
    #imfile.show("testdatecnvrtd.png",imfile)
    imfile.save("testdatecnvrtd.png")



     #cpp code converted from     http://docs.opencv.org/3.2.0/d1/dee/tutorial_moprh_lines_detection.html
    import cv2
    import numpy as np

    img = cv2.imread("testdatecnvrtd.png")
    img=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    img = cv2.bitwise_not(img)
    th2 = cv2.adaptiveThreshold(img,255, cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,15,-2)

    # kernel = np.ones((5, 5), np.uint8)
    # img_erosion = cv2.erode(th2, kernel, iterations=1)
    # cv2.imshow("x", img_erosion)

    #cv2.imshow("th2", th2)
    cv2.imwrite("th2.jpg", th2)
    cv2.waitKey(0)
    # cv2.destroyAllWindows()

    horizontal = th2
    vertical = th2
    rows,cols = horizontal.shape

    verticalsize = rows / 14
    # verticalStructure = cv2.getStructuringElement(cv2.MORPH_RECT, (1, verticalsize))
    verticalStructure = cv2.getStructuringElement(cv2.MORPH_RECT, (verticalsize, 1))
    vertical = cv2.erode(vertical, verticalStructure, (-1, -1))
    vertical = cv2.dilate(vertical, verticalStructure, (-1, -1))
    #cv2.imshow("vertical", vertical)
    cv2.imwrite("testdatecnvrtdremovedlines.png", vertical)
    cv2.waitKey(0)
    # cv2.destroyAllWindows()


    #inverse the image, so that lines are black for masking
    vertical_inv = cv2.bitwise_not(vertical)
    #perform bitwise_and to mask the lines with provided mask
    masked_imgverti = cv2.bitwise_and(img, img, mask=vertical_inv)
    #reverse the image back to normal
    masked_imgvert_inv = cv2.bitwise_not(masked_imgverti)
    # cv2.imshow("masked imgverti", masked_imgvert_inv)
    cv2.imwrite("resultverti.jpg", masked_imgvert_inv)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()





    # TrainAndTest.py

    import cv2
    import numpy as np
    import operator
    import os
    # import binarizationAndRemoveLines

    # module level variables ##########################################################################
    MIN_CONTOUR_AREA = 185

    RESIZED_IMAGE_WIDTH = 20
    RESIZED_IMAGE_HEIGHT = 30

    ###################################################################################################
    class ContourWithData():

        # member variables ############################################################################
        npaContour = None           # contour
        boundingRect = None         # bounding rect for contour
        intRectX = 0                # bounding rect top left corner x location
        intRectY = 0                # bounding rect top left corner y location
        intRectWidth = 0            # bounding rect width
        intRectHeight = 0           # bounding rect height
        fltArea = 0.0               # area of contour

        def calculateRectTopLeftPointAndWidthAndHeight(self):              # calculate bounding rect info
            [intX, intY, intWidth, intHeight] = self.boundingRect
            self.intRectX = intX
            self.intRectY = intY
            self.intRectWidth = intWidth
            self.intRectHeight = intHeight

        def checkIfContourIsValid(self):                            # this is oversimplified, for a production grade program
            if self.fltArea < MIN_CONTOUR_AREA: return False        # much better validity checking would be necessary
            return True

    ###################################################################################################

    def main():
        allContoursWithData = []                # declare empty lists,
        validContoursWithData = []

        StringDetectedDate = ""
        textToPrint = ""
        # we will fill these shortly

        try:
            npaClassifications = np.loadtxt("GenDatanewnewclassifications.txt", np.float32)                  # read in training classifications
        except:
            print "error, unable to open GenDataInput3flattened_images.txt, exiting program\n"
            os.system("pause")
            return
        # end try

        try:
            npaFlattenedImages = np.loadtxt("GenDatanewnewflattened_images.txt", np.float32)                 # read in training images
        except:
            print "error, unable to open Gendatainput3flattened_images.txt, exiting program\n"
            os.system("pause")
            return
        # end try

        npaClassifications = npaClassifications.reshape((npaClassifications.size, 1))       # reshape numpy array to 1d, necessary to pass to call to train

        kNearest = cv2.ml.KNearest_create()                   # instantiate KNN object

        kNearest.train(npaFlattenedImages, cv2.ml.ROW_SAMPLE, npaClassifications)




        # imgTestingNumbers = cv2.imread("Captukllrecnvrtd.png")          # read in testing numbers image
        imgTestingNumbers = cv2.imread("testdatecnvrtdremovedlines.png")          # read in testing numbers image




        if imgTestingNumbers is None:                           # if image was not read successfully
            print "error: image not read from file \n\n"        # print error message to std out
            os.system("pause")                                  # pause so user can see error message
            return                                              # and exit function (which exits program)
        # end if

        imgGray = cv2.cvtColor(imgTestingNumbers, cv2.COLOR_BGR2GRAY)       # get grayscale image
        imgBlurred = cv2.GaussianBlur(imgGray, (5,5), 0)                    # blur

                                                            # filter image from grayscale to black and white
        imgThresh = cv2.adaptiveThreshold(imgBlurred,                           # input image
                                          255,                                  # make pixels that pass the threshold full white
                                          cv2.ADAPTIVE_THRESH_GAUSSIAN_C,       # use gaussian rather than mean, seems to give better results
                                          cv2.THRESH_BINARY_INV,                # invert so foreground will be white, background will be black
                                          11,                                   # size of a pixel neighborhood used to calculate threshold value
                                          2)                                    # constant subtracted from the mean or weighted mean

        imgThreshCopy = imgThresh.copy()        # make a copy of the thresh image, this in necessary b/c findContours modifies the image

        imgContours, npaContours, npaHierarchy = cv2.findContours(imgThreshCopy,             # input image, make sure to use a copy since the function will modify this image in the course of finding contours
                                                     cv2.RETR_EXTERNAL,         # retrieve the outermost contours only
                                                     cv2.CHAIN_APPROX_SIMPLE)   # compress horizontal, vertical, and diagonal segments and leave only their end points

        for npaContour in npaContours:                             # for each contour
            contourWithData = ContourWithData()                                             # instantiate a contour with data object
            contourWithData.npaContour = npaContour                                         # assign contour to contour with data
            contourWithData.boundingRect = cv2.boundingRect(contourWithData.npaContour)     # get the bounding rect
            contourWithData.calculateRectTopLeftPointAndWidthAndHeight()                    # get bounding rect info
            contourWithData.fltArea = cv2.contourArea(contourWithData.npaContour)           # calculate the contour area
            allContoursWithData.append(contourWithData)                                     # add contour with data object to list of all contours with data
        # end for

        for contourWithData in allContoursWithData:                 # for all contours
            if contourWithData.checkIfContourIsValid():             # check if valid
                validContoursWithData.append(contourWithData)       # if so, append to valid contour list
            # end if
        # end for

        validContoursWithData.sort(key = operator.attrgetter("intRectX"))         # sort contours from left to right

        strFinalString = ""         # declare final string, this will have the final number sequence by the end of the program

        for contourWithData in validContoursWithData:            # for each contour
                                                    # draw a green rect around the current char
            cv2.rectangle(imgTestingNumbers,                                        # draw rectangle on original testing image
                          (contourWithData.intRectX, contourWithData.intRectY),     # upper left corner
                          (contourWithData.intRectX + contourWithData.intRectWidth, contourWithData.intRectY + contourWithData.intRectHeight),      # lower right corner
                          (0, 255, 0),              # green
                          2)                        # thickness

            imgROI = imgThresh[contourWithData.intRectY : contourWithData.intRectY + contourWithData.intRectHeight,     # crop char out of threshold image
                               contourWithData.intRectX : contourWithData.intRectX + contourWithData.intRectWidth]

            imgROIResized = cv2.resize(imgROI, (RESIZED_IMAGE_WIDTH, RESIZED_IMAGE_HEIGHT))             # resize image, this will be more consistent for recognition and storage

            npaROIResized = imgROIResized.reshape((1, RESIZED_IMAGE_WIDTH * RESIZED_IMAGE_HEIGHT))      # flatten image into 1d numpy array

            npaROIResized = np.float32(npaROIResized)       # convert from 1d numpy array of ints to 1d numpy array of floats

            retval, npaResults, neigh_resp, dists = kNearest.findNearest(npaROIResized, k = 1)     # call KNN function find_nearest

            strCurrentChar = str(chr(int(npaResults[0][0])))                                             # get character from results

            strFinalString = strFinalString + strCurrentChar            # append current char to full string
        # end for

        # print "\n" + strFinalString + "\n"                  # show the full string


        characterCount = len(strFinalString)
        if characterCount == 8:
            x = ""
            dayD = ""
            monthD = ""
            yearD = ""

            x = strFinalString
            dayD = strFinalString[:2]
            monthD = strFinalString[2:-4]
            yearD = strFinalString[-4:]
            StringDetectedDate = dayD +"-"+ monthD +"-"+yearD

            from datetime import datetime
            detectedDate = (datetime.strptime(dayD+'-'+monthD+'-'+yearD, '%d-%m-%Y').date())

            from dateutil.relativedelta import relativedelta
            addSixMonths = detectedDate + relativedelta(months=6)

            import time
            currentDate = time.strftime("%Y-%m-%d")

            y = ""
            dayC = ""
            monthC = ""
            yearC = ""

            day = currentDate[:2]
            month = currentDate[2:-4]
            year = currentDate[:-4]

            from datetime import date
            if detectedDate > date.today():
                textToPrint =  "Date Invalid"
            elif addSixMonths < date.today():
                textToPrint =  "Date Invalid"
            else:
                textToPrint = "Date Valid"

        else:
            textToPrint = "Date Cannot Detect ..."



        # cv2.imshow("imgTestingNumbers", imgTestingNumbers)      # show input image with green boxes drawn around found digits
        # cv2.waitKey(0)                                         # wait for user key press
        # cv2.destroyAllWindows()             # remove windows from memory

        print(StringDetectedDate + " " + textToPrint)


    ###################################################################################################
    if __name__ == "__main__":
        main()
    # end if

    return

import sys

param = sys.argv[1]
dateRecognitionAndVerification(param)
