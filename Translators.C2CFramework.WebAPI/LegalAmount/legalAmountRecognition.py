import cv2
import numpy as np
import operator
import sys

from difflib import SequenceMatcher
import sys


def SyntacticValidation(erroneousInput):
    temp = 0
    outputString = ""
    with open ("NumberList.txt", "r") as myfile:
        data = myfile.readlines()

        for item in data:

            # item = item + 'only'
            item = item.upper()
            item = item.strip()

            # print item

            percentage = SequenceMatcher(None, item, erroneousInput).ratio()

            # print percentage
            
            if percentage >= 0.6:
                if temp<percentage:
                    temp = percentage
                    outputString = item
    
    print outputString
    
    return

def handWrittenAlphabetRecognition (path):

    class ContourWithData():

        charContour = None
        boundingRectofChar = None
        intRectX = 0
        intRectY = 0
        intRectWidth = 0
        intRectHeight = 0
        areaOfContour = 0.0

        def calculateRectTopLeftPointAndWidthAndHeight(self):
            [intX, intY, intWidth, intHeight] = self.boundingRectofChar
            self.intRectX = intX
            self.intRectY = intY
            self.intRectWidth = intWidth
            self.intRectHeight = intHeight

        def checkIfContourIsValid(self):
            if self.areaOfContour < 100: return False
            return True

    def main():
        allContoursWithData = []
        validContoursWithData = []

        digitClassificationCluster = np.loadtxt("alphabet_Classification_Cluster.txt", np.float32)
        flattenedDigitImageVector = np.loadtxt("knn_Flattened_alphabetic_Images.txt", np.float32)

        digitClassificationCluster = digitClassificationCluster.reshape((digitClassificationCluster.size, 1))

        kNearestNeighbor = cv2.ml.KNearest_create()

        kNearestNeighbor.train(flattenedDigitImageVector, cv2.ml.ROW_SAMPLE, digitClassificationCluster)

        courtesyAmountInput = cv2.imread(path, cv2.IMREAD_UNCHANGED )

        courtesyAmountInput = cv2.fastNlMeansDenoisingColored(courtesyAmountInput, None, 10, 10, 7, 21)

        grayScalledImg = cv2.cvtColor(courtesyAmountInput, cv2.COLOR_BGR2GRAY)
        blurredImg = cv2.GaussianBlur(grayScalledImg, (5,5), 0)

        binarizedImg = cv2.adaptiveThreshold(blurredImg,255,cv2.ADAPTIVE_THRESH_GAUSSIAN_C,cv2.THRESH_BINARY_INV,11,2)

        binarizedImgCopy = binarizedImg.copy()

        imgContours, charContours, npaHierarchy = cv2.findContours(binarizedImgCopy, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

        for charContour in charContours:
            contourWithData = ContourWithData()
            contourWithData.charContour = charContour
            contourWithData.boundingRectofChar = cv2.boundingRect(contourWithData.charContour)
            contourWithData.calculateRectTopLeftPointAndWidthAndHeight()
            contourWithData.areaOfContour = cv2.contourArea(contourWithData.charContour)
            allContoursWithData.append(contourWithData)

        for contourWithData in allContoursWithData:
            if contourWithData.checkIfContourIsValid():
                validContoursWithData.append(contourWithData)

        validContoursWithData.sort(key = operator.attrgetter("intRectX"))

        legalAmountStringValue = ""

        for contourWithData in validContoursWithData:

            cv2.rectangle(courtesyAmountInput,(contourWithData.intRectX, contourWithData.intRectY),(contourWithData.intRectX + contourWithData.intRectWidth, contourWithData.intRectY + contourWithData.intRectHeight),(0, 255, 0),2)

            ROI = binarizedImg[contourWithData.intRectY: contourWithData.intRectY + contourWithData.intRectHeight,contourWithData.intRectX: contourWithData.intRectX + contourWithData.intRectWidth]

            ROIResized = cv2.resize(ROI, (20, 30))

            npaROIResized = ROIResized.reshape((1, 20 * 30))

            npaROIResized = np.float32(npaROIResized)

            retval, npaResults, neigh_resp, dists = kNearestNeighbor.findNearest(npaROIResized, k = 1)

            strCurrentChar = str(chr(int(npaResults[0][0])))

            legalAmountStringValue = legalAmountStringValue + strCurrentChar

        correctedlegalAmountStringValue = SyntacticValidation(legalAmountStringValue)

        print correctedlegalAmountStringValue

        # cv2.imshow("Segmented Characters",courtesyAmountInput)
        # cv2.waitKey(0)
        # cv2.destroyAllWindows()

        return

    if __name__ == "__main__":
        main()

    return

param = sys.argv[1]
handWrittenAlphabetRecognition(param)

