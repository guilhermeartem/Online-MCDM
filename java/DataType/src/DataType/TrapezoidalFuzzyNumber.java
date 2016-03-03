package DataType;

/***
 * @author Rodolfo Lourenzutti
 * 06/08/2014
 * This class represents the trapezoidal fuzzy number (TFN). The TFN has four parameters:
 * a_1, a_2, a_3 and a_4. These parameters define the membership function.
 */
public class TrapezoidalFuzzyNumber extends DataEntry
{
	/***
	 * The parameters array of the TFN.
	 */
    double[] a = new double[4];

    /***
     * This constructor receives the parameter array.
     * @param a An array {a_0, a_1, a_2, a_3}
     * @exception IllegalArgumentException Thrown when a[i] is greater than a[i+1] for one i in 0 to 3.
     */
    public TrapezoidalFuzzyNumber(double[] a)
    {
        SetAllParameters(a[0], a[1], a[2], a[3]);
    }

    /***
     * Set all parameters of TFN object. It checks if the conditions are satisfied, if they are
     * not it throws an exception.
     * @param a0 Parameter a_0.
     * @param a1 Parameter a_1.
     * @param a2 Parameter a_2.
     * @param a3 Parameter a_3.
     * @exception IllegalArgumentException Thrown when a[i] is greater than a[i+1] for some i in 0 to 3.
     */
    public void SetAllParameters(double a0, double a1, double a2, double a3)
    {
        if (a0 <= a1 && a1 <= a2 && a2 <= a3)
        {
            a[0] = a0;
            a[1] = a1;
            a[2] = a2;
            a[3] = a3;
        }
        else
            throw new IllegalArgumentException("The parameters must satisfy a[1]<=a[2]<=a[3]<=a[4]");
    }


    /***
     * Calculates the membership degree for a determined value x.
     * @param x The value which is desired to know the membership degree.
     * @return The membership degree of the argument x.
     */
    public double Membership(double x)
    {
        if (a[0] < x && x < a[1])
            return (x - a[0]) / (a[1] - a[0]);
        else if (a[1] <= x && x <= a[2])
            return 1;
        else if (a[2] < x && x < a[3])
            return (a[3] - x) / (a[3] - a[2]);
        else
            return 0;
    }
    
    /***
     * @see NormalizeDateEntry.
     */
    @Override
    public void NormalizeDataEntry(double max)
    {
        SetAllParameters(a[0]/max,a[1]/max,a[2]/max,a[3]/max);
    }

    /***
     * Calculates the deffuzified value according to Chen (1996) - Fuzzy Sets and Systems 77 (1996) 265-276
     * @return The deffuzified value of the caller.
     */
    public double Deffuzified()
    {
        return (a[0] + a[1] + a[2] + a[3]) / 4;
    }

    /***
     * Return the supremum value that belongs to the TFN caller, i.e., a[3].
     */
    @Override
    public double GetMax()
    {
        return a[3];
    }
    
    @Override
    public int compareTo(DataEntry other)
    {
        TrapezoidalFuzzyNumber b = (TrapezoidalFuzzyNumber) other;
        
        if (b == null)
            throw new IllegalArgumentException("A null reference was passed to the method compareTo");
        else if (this.Deffuzified() > b.Deffuzified())
            return 1;
        else if (this.Deffuzified() == b.Deffuzified())
            return 0;

        return -1;	
    }

    @Override
    public String toString()
    {
        return String.format("(%4.2f, %4.2f, %4.2f, %4.2f)", a[0], a[1], a[2], a[3]); 	 
    }

    /***
     * Calculates the distance between two TFN: the caller and the argument. The distance used 
     * is the L1(absolute)-distance, given by, sum_{i=0}^3 |a[i]-b[i]|/4.
     * @param other A TFN object.
     * @return The distance measure.
     */
    @Override
    public double Distance(DataEntry other)
    {
        TrapezoidalFuzzyNumber b = (TrapezoidalFuzzyNumber)other;
        return TrapezoidalFuzzyNumber.DistanceL1(this,b);
        //return TrapezoidalFuzzyNumber.DistanceMadahvi(this, b);
    }
    /***
     * This method calculates the distance between two TNF proposed in Madahvi (2008) - Applied Mathematics and Computation.
     * @param a A TFN object.
     * @param b A TFN object.
     * @return The Mahdavi distance between a and b.
     */
    public static double DistanceMadahvi(TrapezoidalFuzzyNumber a, TrapezoidalFuzzyNumber b)
    {
        double dist = 0;

        for (int i = 0; i < 4; i++)
        {
            dist += Math.pow((a.a[i] - b.a[i]), 2);
        }
        dist += (a.a[0] - b.a[0]) * (a.a[1] - b.a[1]);
        dist += (a.a[2] - b.a[2]) * (a.a[3] - b.a[3]);

        return Math.pow((dist / 6), 0.5);
    }

    /***
     * The Euclidean distance between two TFS objects.
     * @param a A TFN object.
     * @param b A TFN object.
     * @return The Euclidean distance between a and b.
     */
    public static double DistanceL2(TrapezoidalFuzzyNumber a, TrapezoidalFuzzyNumber b)
    {
        double dist = 0;

        for (int i = 0; i < 4; i++)
        {
            dist += Math.pow((a.a[i] - b.a[i]), 2);
        }
        dist /= 4;

        return Math.pow(dist, 0.5);
    }

    /***
     * The Hamming distance between two TFS objects.
     * @param a A TFN object.
     * @param b A TFN object.
     * @return The Hamming distance between a and b.
     */
    public static double DistanceL1(TrapezoidalFuzzyNumber a, TrapezoidalFuzzyNumber b)
    {
        double dist = 0;

        for (int i = 0; i < 4; i++)
        {
            dist += Math.abs(a.a[i] - b.a[i]);
        }
        return dist / 4;
    }

}