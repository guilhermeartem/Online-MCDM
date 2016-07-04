package DataType;

/**
 *This is the base class for every data type (crisp,interval, fuzzy, intuitionistic fuzzy). 
 */
public abstract class DataEntry implements Comparable<DataEntry>
{
		/**
		 *  Normalize the parameters values of the object caller by dividing the values by the parameter max.
		 *  In a MCDM problem, it would be the maximum value of a certain criterion.
		 *  @param max the value to be used to normalize the parameters.
		 *  @param min the value to be used to normalize the parameters.
		 *  @param benefit 0 for cost and 1 for benefit
		 */
        abstract public void NormalizeDataEntry(double min, double max, int benefit);
        
        /**
        * {@link GetMax} This method returns the sup value of the caller object. For example, if a triangular fuzzy set (a, b, b, c) calls the method, the method returns c.
        * If an interval number [a,b] calls the method the method returns b. Etc...
        * @return The sup value of the caller object.
        */
        abstract public double GetMax();
        /**
         * {@link GetMin} This method returns the inf value of the caller object. For example, if a triangular fuzzy set (a, b, b, c) calls the method, the method returns a.
         * If an interval number [a,b] calls the method the method returns a. Etc...
         * @return The inf value of the caller object.
         */
         abstract public double GetMin();
        /**
         * Calculates the distance between the caller object and the argument.
         * @param a A object that the distance must be calculated from.
         * @return The distance between the object that calls the method and the object in the argument.
         */
        abstract public double Distance(DataEntry a);

        /**
         * A method for comparisons between two data points that are subclasses of DataEntry.
         * @param other The other data point to be compared.
         * @return 1 if the caller object is higher than the object, 0 if they are equal and -1 if the caller object is smaller.
         */
        abstract public int compareTo(DataEntry other);
        
        /**
         * This method normalizes a whole data matrix independently of the data type of each column.
         * @param DM The data matrix to be normalized.
         * @param benefit The benefit array, value 1 for benefit and 0 for cost.
         * @param printNormalized If true the method will print the normalized data matrix. If false, it will not.
         */
        public static void Normalize(DataEntry[][] DM, int[] benefit, Boolean printNormalized){
		    double[] maxDouble = new double[DM[0].length];
		    double[] minDouble = new double[DM[0].length];
		
		    for (int j = 0; j < DM[0].length; j++){
			    maxDouble[j] = DM[0][j].GetMax(); 
			    minDouble[j] = DM[0][j].GetMin();
			    for (int i = 0; i < DM.length; i++){
				    if ( DM[i][j].GetMax() >= maxDouble[j] )
					    maxDouble[j] = DM[i][j].GetMax();
				    if ( DM[i][j].GetMin() <= minDouble[j] )
					    minDouble[j] = DM[i][j].GetMin();
			    }
		    }

		    for (int j = 0; j < DM[1].length; j++){
			    if (printNormalized)
			    	System.out.printf("max[%d] = %6.2f ,min[%d] = %6.2f ", j, maxDouble[j], j, minDouble[j]);
			    for (int i = 0; i < DM.length; i++){
				    DM[i][j].NormalizeDataEntry(minDouble[j], maxDouble[j], benefit[j]);
			    }
		    }

		    if (printNormalized){
		    	System.out.printf("\n\nNormalized Decision Matrix:\n\n");
			    for (int i = 0; i < DM.length; i++){
				    for (int j = 0; j < DM[1].length; j++)
				    	System.out.printf(DM[i][j]+" ");
				    System.out.printf("\n");
			    }
			    System.out.printf("\n\n"); 
		    }
	    }
        
//        public static void Normalize(DataEntry[][] DM, Boolean printNormalized){
//		    double[] maxDouble = new double[DM[0].length];
//		    double[] minDouble = new double[DM[0].length];
//		
//		    for (int j = 0; j < DM[0].length; j++){
//			    maxDouble[j] = DM[0][j].GetMax(); 
//			    for (int i = 0; i < DM.length; i++){
//				    if ( DM[i][j].GetMax() >= maxDouble[j] )
//					    maxDouble[j] = DM[i][j].GetMax();
//			    }
//		    }
//
//		    for (int j = 0; j < DM[1].length; j++){
//			    if (printNormalized)
//			    	System.out.printf("max[%d] = %6.2f  ", j, maxDouble[j]);
//			    for (int i = 0; i < DM.length; i++){
//				    DM[i][j].NormalizeDataEntry(maxDouble[j]);
//			    }
//		    }
//
//		    if (printNormalized){
//		    	System.out.printf("\n\nNormalized Decision Matrix:\n\n");
//			    for (int i = 0; i < DM.length; i++){
//				    for (int j = 0; j < DM[1].length; j++)
//				    	System.out.printf(DM[i][j]+" ");
//				    System.out.printf("\n");
//			    }
//			    System.out.printf("\n\n"); 
//		    }
//	    }
        
//        public static void Normalize(DataEntry[][] DM, Boolean printNormalized){
//		    double[] maxDouble = new double[DM[0].length];
//		
//		    for (int j = 0; j < DM[0].length; j++){
//			    maxDouble[j] = DM[0][j].GetMax(); 
//			    for (int i = 0; i < DM.length; i++){
//				    if ( DM[i][j].GetMax() >= maxDouble[j] )
//					    maxDouble[j] = DM[i][j].GetMax();
//			    }
//		    }
//
//		    for (int j = 0; j < DM[1].length; j++){
//			    if (printNormalized)
//			    	System.out.printf("max[%d] = %6.2f  ", j, maxDouble[j]);
//			    for (int i = 0; i < DM.length; i++){
//				    DM[i][j].NormalizeDataEntry(maxDouble[j]);
//			    }
//		    }
//
//		    if (printNormalized){
//		    	System.out.printf("\n\nNormalized Decision Matrix:\n\n");
//			    for (int i = 0; i < DM.length; i++){
//				    for (int j = 0; j < DM[1].length; j++)
//				    	System.out.printf(DM[i][j]+" ");
//				    System.out.printf("\n");
//			    }
//			    System.out.printf("\n\n"); 
//		    }
//	    }

}


