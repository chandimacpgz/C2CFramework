# final date
from PIL import Image

def dateRecognitionAndVerification(path):

    col = Image.open(path)
    gray = col.convert('L')

    import numpy as np

    bw = np.asarray(gray).copy()

    bw[bw < 128] = 0
    bw[bw >= 128] = 255
    import cv2
    imfile = Image.fromarray(bw)
    # imfile.show("testdatecnvrtd.png",imfile)
    imfile.save("testdatecnvrtd.png")

    import cv2
    import numpy as np

    img = cv2.imread("testdatecnvrtd.png")
    img=cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

    img = cv2.bitwise_not(img)
    th2 = cv2.adaptiveThreshold(img,255, cv2.ADAPTIVE_THRESH_MEAN_C,cv2.THRESH_BINARY,15,-2)

    # cv2.imshow("th2", th2)
    cv2.imwrite("th2.jpg", th2)
    cv2.waitKey(0)
    # cv2.destroyAllWindows()

    horizontal = th2
    vertical = th2
    rows,cols = horizontal.shape

    verticalsize = rows / 14
    verticalStructure = cv2.getStructuringElement(cv2.MORPH_RECT, (verticalsize, 1))
    vertical = cv2.erode(vertical, verticalStructure, (-1, -1))
    vertical = cv2.dilate(vertical, verticalStructure, (-1, -1))
    # cv2.imshow("vertical", vertical)
    cv2.imwrite("testdatecnvrtdremovedlines.png", vertical)
    cv2.waitKey(0)
    # cv2.destroyAllWindows()

    vertical_inv = cv2.bitwise_not(vertical)
    masked_imgverti = cv2.bitwise_and(img, img, mask=vertical_inv)
    masked_imgvert_inv = cv2.bitwise_not(masked_imgverti)
    cv2.imwrite("resultverti.jpg", masked_imgvert_inv)
    # cv2.waitKey(0)
    # cv2.destroyAllWindows()

    import cv2
    import numpy as np
    import operator
    import os

    MIN_CONTOUR_AREA = 185

    RESIZED_IMAGE_WIDTH = 20
    RESIZED_IMAGE_HEIGHT = 30

    class ContourWithData():

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

    ##############################

    def main():
        allContoursWithData = []
        validContoursWithData = []

        StringDetectedDate = ""
        textToPrint = ""

        try:
            npaClassifications = np.loadtxt("GenDatanewnewclassifications.txt", np.float32)
        except:
            print "error, unable to open GenDataInput3flattened_images.txt, exiting program\n"
            os.system("pause")
            return
        # end try

        try:
            npaFlattenedImages = np.loadtxt("GenDatanewnewflattened_images.txt", np.float32)
        except:
            print "error, unable to open Gendatainput3flattened_images.txt, exiting program\n"
            os.system("pause")
            return
        # end try

        npaClassifications = npaClassifications.reshape((npaClassifications.size, 1))

        kNearest = cv2.ml.KNearest_create()

        kNearest.train(npaFlattenedImages, cv2.ml.ROW_SAMPLE, npaClassifications)

        imgTestingNumbers = cv2.imread("testdatecnvrtdremovedlines.png")


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

        imgContours, npaContours, npaHierarchy = cv2.findContours(imgThreshCopy,
                                                     cv2.RETR_EXTERNAL,
                                                     cv2.CHAIN_APPROX_SIMPLE)

        for npaContour in npaContours:
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

        strFinalString = ""

        for contourWithData in validContoursWithData:

            cv2.rectangle(imgTestingNumbers,
                          (contourWithData.intRectX, contourWithData.intRectY),
                          (contourWithData.intRectX + contourWithData.intRectWidth, contourWithData.intRectY + contourWithData.intRectHeight),
                          (0, 255, 0),
                          2)

            imgROI = imgThresh[contourWithData.intRectY : contourWithData.intRectY + contourWithData.intRectHeight,
                               contourWithData.intRectX : contourWithData.intRectX + contourWithData.intRectWidth]

            imgROIResized = cv2.resize(imgROI, (RESIZED_IMAGE_WIDTH, RESIZED_IMAGE_HEIGHT))

            npaROIResized = imgROIResized.reshape((1, RESIZED_IMAGE_WIDTH * RESIZED_IMAGE_HEIGHT))

            npaROIResized = np.float32(npaROIResized)

            retval, npaResults, neigh_resp, dists = kNearest.findNearest(npaROIResized, k = 1)

            strCurrentChar = str(chr(int(npaResults[0][0])))

            strFinalString = strFinalString + strCurrentChar
        # end for

        # print "\n" + strFinalString + "\n"

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
            try:
                detectedDate = (datetime.strptime(dayD+'-'+monthD+'-'+yearD, '%d-%m-%Y').date())
            except:
                print "Date Invalid\n"
                os.system("pause")
                return

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
                textToPrint =  "Date Invalid(not with in the six months)"
            elif addSixMonths < date.today():
                textToPrint =  "Date Invalid(not with in the six months)"
            else:
                textToPrint = "Date Valid"

        else:
            textToPrint = "Date Cannot Detect ..."

        print(StringDetectedDate + " " + textToPrint)


    ###################################################################################################
    if __name__ == "__main__":
        main()
    # end if

    return

import sys

param = sys.argv[1]
dateRecognitionAndVerification(param)
