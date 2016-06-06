package DataType;

/***
 * @author Guilherme Artém dos Santos
 * 06/06/2016
 * This class represents the trapezoidal z-number (TFN). The TZN has eight parameters:
 * a_1, a_2, a_3, a_4, a_1, a_2, a_3 e a_4. These parameters define the two membership function.
 */

public class TrapezoidalZNumber {

	/***
	 * The parameters array of the TZN.
	 */
    double[] a = new double[4];
    double[] b = new double[4];
    
    /***
    * This constructor receives the parameter array.
    * @param a An array {a_0, a_1, a_2, a_3}
    * @exception IllegalArgumentException Thrown when a[i] is greater than a[i+1] for one i in 0 to 3.
    */
   public TrapezoidalZNumber(double[] a, double[] b)
   {
       SetAllParameters(a[0], a[1], a[2], a[3], b[0], b[1], b[2], b[3]);
   }
    
    /***
     * Set all parameters of TZN object. It checks if the conditions are satisfied, if they are
     * not it throws an exception.
     * @param a0 Parameter a_0.
     * @param a1 Parameter a_1.
     * @param a2 Parameter a_2.
     * @param a3 Parameter a_3.
     * @param b0 Parameter b_0.
     * @param b1 Parameter b_1.
     * @param b2 Parameter b_2.
     * @param b3 Parameter b_3.
     * @exception IllegalArgumentException Thrown when a[i] is greater than a[i+1] for some i in 0 to 3.
     */
    public void SetAllParameters(double a0, double a1, double a2, double a3, double b0, double b1, double b2, double b3)
    {
        if (a0 <= a1 && a1 <= a2 && a2 <= a3 && b0 <= b1 && b1 <= b2 && b2 <= b3)
        {
            a[0] = a0;
            a[1] = a1;
            a[2] = a2;
            a[3] = a3;
            b[0] = b0;
            b[1] = b1;
            b[2] = b2;
            b[3] = b3;
        }
        else
            throw new IllegalArgumentException("The parameters must satisfy a[1]<=a[2]<=a[3]<=a[4] and b[1]<=b[2]<b[3]<=b[4]");
    }
    
    TrapezoidalFuzzyNumber ConvertToFuzzy(){
    	TrapezoidalFuzzyNumber fuzzy;
    	double alpha, sqrtAlpha;
    	
    	alpha = (b[0] + b[1] + b[2] + b[3])/4;
    	
    	sqrtAlpha = Math.pow(alpha, 0.5);
    	
    	fuzzy = new TrapezoidalFuzzyNumber(new double[] {0,0,0,0});
    	
    	fuzzy.SetAllParameters(a[0]/sqrtAlpha, a[1]/sqrtAlpha, a[2]/sqrtAlpha, a[3]/sqrtAlpha);
    	
    	return fuzzy;
    }
    
}
