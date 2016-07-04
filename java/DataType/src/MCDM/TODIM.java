package MCDM;

import DataType.DataEntry;

/***
 * @author Rodolfo Lourenzutti
 * Date 06/07/2014
 * A class with that contains the TODIM methods.
 */
public final class TODIM{
    /***
     * This method perform the standard TODIM, as proposed in Gomes and Rangel (2009) - Journal of Operational Research. 
     */
	public static double[] Standard(DataType.DataEntry[][] DM, double[] w, double theta, int[] benefit, Boolean printPhi){

	    double[][][] phi = new double[DM[0].length][DM.length][DM.length];
	    double[][] delta = new double[DM.length][DM.length];
	    double[] epsilon = new double[DM.length]; 
	
	    if (printPhi)
		    System.out.println("Partial dominance matrices: ");
	    
	    for (int c=0; c < DM[0].length; c++ ){
		    if (printPhi)
			    System.out.printf("Phi[{0}]: \n",c);
		    for (int i=0; i < DM.length; i++ ){
                for (int j = 0; j < DM.length; j++){
				    if (DM[i][c].compareTo(DM[j][c]) >= 0)
					    phi[c][i][j] = Math.pow( w[c] * DM[i][c].Distance(DM[j][c]), 0.5 )/Math.pow(-theta, (1-benefit[c]));
				    else
					    phi[c][i][j] = Math.pow( 1/w[c] * DM[j][c].Distance(DM[i][c]), 0.5 )/Math.pow(-theta, (benefit[c]) );
				
				    delta[i][j] += phi[c][i][j];
				    if (printPhi)
                        System.out.printf("aki %6.2f", phi[c][i][j]);
			    }
			    if (printPhi)
				    System.out.println();
		    }
		    if (printPhi)
			    System.out.println();
	    }
	
	    for (int i=0; i < DM.length; i++)
            for (int j = 0; j < DM.length; j++)
			    epsilon[i] += delta[i][j];
	
	    double minEpsilon = epsilon[0], maxEpsilon = epsilon[0];

	    System.out.println("aki");
	    
        for (int i = 0; i < DM.length; i++){
		    if (epsilon[i] > maxEpsilon)
			    maxEpsilon = epsilon[i];
		    else if ( epsilon[i] < minEpsilon)
			    minEpsilon = epsilon[i];
		    System.out.printf("A{%d}      %6.2f\n", i + 1, epsilon[i]);
	    }

        for (int i = 0; i < DM.length; i++)
		    epsilon[i] = (epsilon[i]-minEpsilon)/(maxEpsilon - minEpsilon);

        System.out.printf("Final epsilons:\n");
        for (int i = 0; i < DM.length; i++)
            System.out.printf("A{%d}      %6.2f\n", i + 1, epsilon[i]);
	
	    return epsilon;
	}
	

	/***
	 * This method perform the TODIM with the correction of the partial
     * dominance proposed in Lourenzutti and Krohling (2013) - Expert Systems with Applications.
     * @param DM The decision matrix, where each element inherits is a DataEntry object
     * @param w The weight vector. It must sum 1.
     * @param theta The value of the theta parameter. Theta value greater than
     * 1 attenuate the losses and smaller than 1 amplify the losses.
     * @param benefit An array of 0 and 1, 0 representing cost criteria and 1 benefit criteria.
     * @param printPhi If true the method will print the partial dominances.
     * @return The array of the epsilon's values
	 */
    public static double[] Modular(DataEntry[][] DM, double[] w, double theta, int[] benefit, Boolean printPhi)
    {

	    double[][][] phi = new double[DM[0].length][DM.length][DM.length];
	    double[][] delta = new double[DM.length][DM.length];
	    double[] epsilon = new double[DM.length]; 

	    if (printPhi)
		    System.out.println("Partial dominance matrices: ");
	    
	    for (int c=0; c < DM[0].length; c++ ){
		    if (printPhi)
			    System.out.printf("Phi[%d]: \n",c);
		    for (int i=0; i < DM.length; i++ ){
                for (int j = 0; j < DM.length; j++){
				    if (DM[i][c].compareTo(DM[j][c]) >= 0)
					    phi[c][i][j] = Math.pow( w[c] * DM[i][c].Distance(DM[j][c]), 0.5 );
				    else
					    phi[c][i][j] = Math.pow( w[c] * DM[j][c].Distance(DM[i][c]), 0.5 )/(-theta);
				
				    delta[i][j] += phi[c][i][j];
				    if (printPhi)
                        System.out.printf("%6.2f", phi[c][i][j]);
			    }
			    if (printPhi)
				    System.out.println();
		    }
		    if (printPhi)
			    System.out.println();
	    }
	
	    for (int i=0; i < DM.length; i++)
            for (int j = 0; j < DM.length; j++)
			    epsilon[i] += delta[i][j];
	
	    double minEpsilon = epsilon[0], maxEpsilon = epsilon[0];

        for (int i = 0; i < DM.length; i++){
		    if (epsilon[i] > maxEpsilon)
			    maxEpsilon = epsilon[i];
		    else if ( epsilon[i] < minEpsilon)
			    minEpsilon = epsilon[i];
		    
//		    System.out.printf("A_%d      %6.2f\n", i + 1, epsilon[i]);
	    }
        
        System.out.println("minEpsilon: " + minEpsilon);
 	   System.out.println("maxEpsilon: " + maxEpsilon);

        for (int i = 0; i < DM.length; i++)
		    epsilon[i] = (epsilon[i]-minEpsilon)/(maxEpsilon - minEpsilon);
        
        System.out.printf("Final epsilons:\n");
        for (int i = 0; i < DM.length; i++)
            System.out.printf("A_%d      %6.2f\n", i + 1, epsilon[i]);
	
	    return epsilon;

    }
    
//    public static double[] Modular(DataEntry[][] DM, double[] w, double theta, int[] benefit, Boolean printPhi)
//    {
//
//	    double[][][] phi = new double[DM[0].length][DM.length][DM.length];
//	    double[][] delta = new double[DM.length][DM.length];
//	    double[] epsilon = new double[DM.length]; 
//
//	    if (printPhi)
//		    System.out.println("Partial dominance matrices: ");
//	    
//	    for (int c=0; c < DM[0].length; c++ ){
//		    if (printPhi)
//			    System.out.printf("Phi[%d]: \n",c);
//		    for (int i=0; i < DM.length; i++ ){
//                for (int j = 0; j < DM.length; j++){
//				    if (DM[i][c].compareTo(DM[j][c]) >= 0)
//					    phi[c][i][j] = Math.pow( w[c] * DM[i][c].Distance(DM[j][c]), 0.5 )/Math.pow(-theta, (1-benefit[c]));
//				    else
//					    phi[c][i][j] = Math.pow( w[c] * DM[j][c].Distance(DM[i][c]), 0.5 )/Math.pow(-theta, (benefit[c]) );
//				
//				    delta[i][j] += phi[c][i][j];
//				    if (printPhi)
//                        System.out.printf("%6.2f", phi[c][i][j]);
//			    }
//			    if (printPhi)
//				    System.out.println();
//		    }
//		    if (printPhi)
//			    System.out.println();
//	    }
//	
//	    for (int i=0; i < DM.length; i++)
//            for (int j = 0; j < DM.length; j++)
//			    epsilon[i] += delta[i][j];
//	
//	    double minEpsilon = epsilon[0], maxEpsilon = epsilon[0];
//
//        for (int i = 0; i < DM.length; i++){
//		    if (epsilon[i] > maxEpsilon)
//			    maxEpsilon = epsilon[i];
//		    else if ( epsilon[i] < minEpsilon)
//			    minEpsilon = epsilon[i];
//		    
////		    System.out.printf("A_%d      %6.2f\n", i + 1, epsilon[i]);
//	    }
//        
//        System.out.println("minEpsilon: " + minEpsilon);
// 	   System.out.println("maxEpsilon: " + maxEpsilon);
//
//        for (int i = 0; i < DM.length; i++)
//		    epsilon[i] = (epsilon[i]-minEpsilon)/(maxEpsilon - minEpsilon);
//        
//        System.out.printf("Final epsilons:\n");
//        for (int i = 0; i < DM.length; i++)
//            System.out.printf("A_%d      %6.2f\n", i + 1, epsilon[i]);
//	
//	    return epsilon;
//
//    }

}
