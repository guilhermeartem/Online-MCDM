package MCDM;

import DataType.Crisp;
import DataType.DataEntry;
import DataType.IntervalNumber;
import DataType.TrapezoidalFuzzyNumber;
import DataType.TrapezoidalIntuitionisticFuzzyNumber;
import DataType.TrapezoidalZNumber;

/**
 * @author Rodolfo Lourenzutti
 * 06/07/2014
 * This class implements the program of the new paper.s
 */
public class ProgramModular{
	public static void main(String[] args){
		
		System.out.printf("\n**************************************************************\n"
                + "**********************EXEMPLO 1*******************************\n"
                + "**************************************************************\n\n");
		
		TrapezoidalZNumber zh = new TrapezoidalZNumber(new double[] {0.5,0.75,0.75,1}, new double[] {1,1,1,1});
		TrapezoidalZNumber zm = new TrapezoidalZNumber(new double[] {0.25,0.5,0.5,0.75}, new double[] {1,1,1,1});
		TrapezoidalZNumber zl = new TrapezoidalZNumber(new double[] {0,0.25,0.25,0.5}, new double[] {1,1,1,1});
		
		DataEntry[][] DM = {{zh.ConvertToFuzzy(), zm.ConvertToFuzzy()}, 
					{ zm.ConvertToFuzzy(), zl.ConvertToFuzzy()}};
		
		double[] w = {0.7,0.3};
		int[] benefit = {1,0};
//		double theta = 0.4;
		DataEntry.Normalize(DM, benefit, true);
		
		TOPSIS.Modular(DM,w,benefit,true);
//		TODIM.Modular(DM, w, theta, benefit, true);

//		System.out.printf("\n**************************************************************\n"
//		                  + "**********************EXEMPLO 1*******************************\n"
//		                  + "**************************************************************\n\n");
//		DataEntry[][] DM = {{ new Crisp(660), new IntervalNumber(1,3), new TrapezoidalFuzzyNumber(new double[] {4,5,5,6})}, 
//					    	{ new Crisp(630), new IntervalNumber(2,3), new TrapezoidalFuzzyNumber(new double[] {4,6,6,8})},
//							{ new Crisp(650), new IntervalNumber(2,3), new TrapezoidalFuzzyNumber(new double[] {6,7,7,8})}};
//		double[] w = {0.4,0.3,0.3};
//		int[] benefit = {0,0,1};
//		double theta = 0.4;
//		DataEntry.Normalize(DM, true);
//		
//		TOPSIS.Modular(DM,w,benefit,true);
//		TODIM.Modular(DM, w, theta, benefit, true);
//		
//		System.out.printf("\n**************************************************************\n"
//			          + "**********************EXEMPLO 2*******************************\n"
//			          + "**************************************************************\n\n");
//		DataEntry[][] DM1 =   { { new Crisp(2.0), new TrapezoidalFuzzyNumber(new double[] {0.4,0.5,0.5,0.6}), new TrapezoidalFuzzyNumber(new double[] {0.8,0.9,0.9,1.0}), new IntervalNumber(55,56), new IntervalNumber(345.91,404.09)},
//		                 { new Crisp(2.5), new TrapezoidalFuzzyNumber(new double[] {0.2,0.3,0.3,0.4}), new TrapezoidalFuzzyNumber(new double[] {0.4,0.5,0.5,0.6}), new IntervalNumber(30,40), new IntervalNumber(359.66,428.34)},
//		                 { new Crisp(1.8), new TrapezoidalFuzzyNumber(new double[] {0.6,0.7,0.7,0.8}), new TrapezoidalFuzzyNumber(new double[] {0.6,0.7,0.7,0.8}), new IntervalNumber(50,60), new IntervalNumber(319.26,392.74)}, 
//		                 { new Crisp(2.2), new TrapezoidalFuzzyNumber(new double[] {0.4,0.5,0.5,0.6}), new TrapezoidalFuzzyNumber(new double[] {0.4,0.5,0.5,0.6}), new IntervalNumber(35,45), new IntervalNumber(432.26,505.743)}};
//		
//		DataEntry.Normalize(DM1,true);
//		
//		double[] w1 = {0.103, 0.45, 0.067, 0.3, 0.08};
//		int[] benefit1 = {1,1,1,1,1};
//		theta = 1;
//		//double[] theta = {0.2,0.4,0.6,0.8,1,1.5,2,2.5};
//		TOPSIS.Modular(DM1,w1,benefit1,true);
//		TODIM.Modular(DM1, w1, theta, benefit1, false);
//		/*for (double t : theta ){
//		epsilon1 = TODIM.modular(DM1, w1, t, benefit1, false);
//		System.out.printf("%5.3f  %5.3f  %5.3f  %5.3f\n",epsilon1[0],epsilon1[1],epsilon1[2], epsilon1[3]);
//		}*/
//		
//		System.out.printf("\n************************************************************************************************************************************\n"
//		      + "******************************************************** EXEMPLO 2.2 ***************************************************************\n"
//		      + "************************************************************************************************************************************\n\n");
//		DataEntry[][] DM2 = { { new Crisp(2.0), new TrapezoidalFuzzyNumber(new double[] {0.4,0.5,0.5,0.6}), new TrapezoidalIntuitionisticFuzzyNumber(new double[] {0.8,0.9,0.9,1.0},new double[] {0.8,0.9,0.9,1.0},0.7,0.15), new IntervalNumber(55,56), new IntervalNumber(345.91,404.09)},
//						 { new Crisp(2.5), new TrapezoidalFuzzyNumber(new double[] {0.2,0.3,0.3,0.4}), new TrapezoidalIntuitionisticFuzzyNumber(new double[] {0.4,0.5,0.5,0.6},new double[] {0.4,0.5,0.5,0.6},0.7,0.15), new IntervalNumber(30,40), new IntervalNumber(359.66,428.34)},
//						 { new Crisp(1.8), new TrapezoidalFuzzyNumber(new double[] {0.6,0.7,0.7,0.8}), new TrapezoidalIntuitionisticFuzzyNumber(new double[] {0.6,0.7,0.7,0.8},new double[] {0.6,0.7,0.7,0.8},0.7,0.15), new IntervalNumber(50,60), new IntervalNumber(319.26,392.74)}, 
//						 { new Crisp(2.2), new TrapezoidalFuzzyNumber(new double[] {0.4,0.5,0.5,0.6}), new TrapezoidalIntuitionisticFuzzyNumber(new double[] {0.4,0.5,0.5,0.6},new double[] {0.4,0.5,0.5,0.6},0.7,0.15), new IntervalNumber(35,45), new IntervalNumber(432.26,505.743)} };
//		DataEntry.Normalize(DM2,true);
//		TOPSIS.Modular(DM2,w1,benefit1,true);
//		TODIM.Modular(DM2, w1, 1, benefit1, false);
//		/*for (double t : theta ){
//		epsilon1 = TODIM.modular(DM2, w1, t, benefit1, false);
//		System.out.printf("%5.3f  %5.3f  %5.3f  %5.3f\n",epsilon1[0],epsilon1[1],epsilon1[2], epsilon1[3]);
//		}*/
		
		
	}
	public static void run(){
		System.out.printf("\n**************************************************************\n"
		                  + "**********************EXEMPLO 1*******************************\n"
		                  + "**************************************************************\n\n");
		DataEntry[][] DM = {{ new Crisp(660), new IntervalNumber(1,3), new TrapezoidalFuzzyNumber(new double[] {4,5,5,6})}, 
					    	{ new Crisp(630), new IntervalNumber(2,3), new TrapezoidalFuzzyNumber(new double[] {4,6,6,8})},
							{ new Crisp(650), new IntervalNumber(2,3), new TrapezoidalFuzzyNumber(new double[] {6,7,7,8})}};
		double[] w = {0.4,0.3,0.3};
		int[] benefit = {0,0,1};
		double theta = 0.4;
		DataEntry.Normalize(DM, benefit, true);
		
		TOPSIS.Modular(DM,w,benefit,true);
		TODIM.Modular(DM, w, theta, benefit, true);
		
	}
}

