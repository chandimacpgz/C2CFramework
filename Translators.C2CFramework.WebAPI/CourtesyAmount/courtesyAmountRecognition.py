import ast
import cv2
import numpy as np
import operator
import os
import inflect
import sys


def handWrittenDigitRecognition (path):

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
            if self.fltArea < 100: return False
            return True

    def main():
        allContoursWithData = []
        validContoursWithData = []

        npaClassifications = np.loadtxt("classifications.txt", np.float32)

        npaFlattenedImages = np.loadtxt("KNN_flattened_images_cluster.txt", np.float32)

        npaClassifications = npaClassifications.reshape((npaClassifications.size, 1))

        kNearest = cv2.ml.KNearest_create()

        kNearest.train(npaFlattenedImages, cv2.ml.ROW_SAMPLE, npaClassifications)

        imgTestingNumbers = cv2.imread(path, cv2.IMREAD_UNCHANGED )

        imgTestingNumbers = cv2.fastNlMeansDenoisingColored(imgTestingNumbers, None, 10, 10, 7, 21)

        imgGray = cv2.cvtColor(imgTestingNumbers, cv2.COLOR_BGR2GRAY)
        imgBlurred = cv2.GaussianBlur(imgGray, (5,5), 0)

        imgThresh = cv2.adaptiveThreshold(imgBlurred,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY_INV,11,2)

        imgThreshCopy = imgThresh.copy()

        imgContours, npaContours, npaHierarchy = cv2.findContours(imgThreshCopy, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for npaContour in npaContours:
            contourWithData = ContourWithData()
            contourWithData.npaContour = npaContour
            contourWithData.boundingRect = cv2.boundingRect(contourWithData.npaContour)
            contourWithData.calculateRectTopLeftPointAndWidthAndHeight()
            contourWithData.fltArea = cv2.contourArea(contourWithData.npaContour)
            allContoursWithData.append(contourWithData)

        for contourWithData in allContoursWithData:
            if contourWithData.checkIfContourIsValid():
                validContoursWithData.append(contourWithData)

        validContoursWithData.sort(key = operator.attrgetter("intRectX"))

        courtesyAmountStringValue = ""

        for contourWithData in validContoursWithData:
            cv2.rectangle(imgTestingNumbers,(contourWithData.intRectX, contourWithData.intRectY),(contourWithData.intRectX + contourWithData.intRectWidth, contourWithData.intRectY + contourWithData.intRectHeight),(0, 255, 0),2)

            imgROI = imgThresh[contourWithData.intRectY: contourWithData.intRectY + contourWithData.intRectHeight,contourWithData.intRectX: contourWithData.intRectX + contourWithData.intRectWidth]

            imgROIResized = cv2.resize(imgROI, (20, 30))

            npaROIResized = imgROIResized.reshape((1, 20 * 30))

            npaROIResized = np.float32(npaROIResized)

            retval, npaResults, neigh_resp, dists = kNearest.findNearest(npaROIResized, k = 1)

            strCurrentChar = str(chr(int(npaResults[0][0])))

            courtesyAmountStringValue = courtesyAmountStringValue + strCurrentChar

        courtesyAmountIntValue = ast.literal_eval(courtesyAmountStringValue)

        # courtesyAmountIntValueList = map(int, str(courtesyAmountIntValue))

        p = inflect.engine()
        courtesyAmountInWord = p.number_to_words(courtesyAmountIntValue)

        print courtesyAmountStringValue #+ "\n" + "\n" + courtesyAmountInWord

        # cv2.imshow("Segmented Characters", imgTestingNumbers)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()

        return

    if __name__ == "__main__":
        main()

    return

param = sys.argv[1]
handWrittenDigitRecognition(param)

