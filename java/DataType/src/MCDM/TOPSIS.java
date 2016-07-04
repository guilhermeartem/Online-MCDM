package MCDM;
/**
 * 
 * @author Rodolfo Lourenzutti 
 * Date 06/07/2014 
 * This class contains the TOPSIS method.
 */
public class TOPSIS{
	/**
	 * This method perform the standard TODIM, as proposed in Gomes and Rangel (2009) - Journal of Operational Research.
	 * @param DM The decision matrix, where each element inherits is a DataEntry object
	 * @param w The weight vector. It must sum 1.
	 * @param benefit An array of 0 and 1, 0 representing cost criteria and 1 benefit criteria.
	 * @param printQuantities If true the method will print additional information.
	 * @return The array of the closeness coefficient.
	 */
    public static double[] Modular(DataType.DataEntry[][] DM, double[] w, int[] benefit, Boolean printQuantities){
		DataType.DataEntry[] PIS = new DataType.DataEntry[DM[0].length];
		DataType.DataEntry[] NIS = new DataType.DataEntry[DM[0].length];
		double[] sPlus = new double[DM.length];
		double[] sMinus = new double[DM.length];
		double[] CC = new double[DM.length];
	
		//define the PIS and NIS solution for each criterion
		for (int c=0; c<DM[0].length; c++){
			PIS[c] = DM[0][c];
			NIS[c] = DM[0][c];
			for (int i=1; i<DM.length; i++){
				if(DM[i][c].compareTo(PIS[c])>=0)
					PIS[c] = DM[i][c];
				else if(DM[i][c].compareTo(NIS[c])<=0)
					NIS[c] = DM[i][c];
			}//end internal for
		}//end external for
		
		if (printQuantities){
			System.out.println("Performing the modular TOPSIS:\n");
			System.out.printf("PIS: ");
			for (int c=0; c<DM[0].length; c++)
				System.out.printf(PIS[c].toString()+"  ");
			System.out.printf("\nNIS: ");
			for (int c=0; c<DM.length; c++)
				System.out.printf(NIS[c].toString()+"  ");
			System.out.printf("\n\n");
		}
		
		for(int i=0; i<DM.length; i++){
			for(int c=0; c<DM[0].length; c++){
				sPlus[i]  +=  w[c]*PIS[c].Distance(DM[i][c]);
				sMinus[i] +=  w[c]*NIS[c].Distance(DM[i][c]);
				//System.out.printf("dist(A%d,PIS[%d]) = %3.3f    dist(A%d,NIS[%d]) = %3.3f  ",i+1,c+1,PIS[c].distance(DM[i][c]),i+1,c+1,NIS[c].distance(DM[i][c]));
			}
			//sPlus[i] = Math.pow(sPlus[i], 0.5); 
			//sMinus[i] = Math.pow(sMinus[i], 0.5);
			if (printQuantities)
				System.out.printf("S+[%d] = %7.3f       S-[%d] = %7.3f\n",i+1,sPlus[i],i+1,sMinus[i]);
		}
		if (printQuantities)
			System.out.printf("\n");
		
		for(int i=0; i<DM.length; i++){
			CC[i] = sMinus[i]/(sPlus[i]+sMinus[i]);
			if (printQuantities)
				System.out.printf("CC[%d] = %7.3f       ",i+1, CC[i]);
		}
		if (printQuantities)
			System.out.printf("\n\n\n");
		return CC;
    }

}

