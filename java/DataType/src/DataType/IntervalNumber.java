package DataType;

/***
 * @author Rodolfo Lourenzutti 
 * Date 06/07/2014
 * This class represents an interval number and inherits from the DataEntry class.
 */
public class IntervalNumber extends DataEntry
{
    /***
     * This field is the infimum of the interval.
     */
	double inf;

	/***
	 * This field is the supremum of the interval.
	 */
    double sup;

    /***
     * A constructor that receive two arguments and create an interval object. Obviously, the xInf paramenter must be less equal than xSup.
     * @param xInf The inf value of the interval. It must be less equal than xSup.
     * @param xSup The sup value of the interval. It must be greater equal than xInf.
     * @exception IllegalArgumentException Thrown when xInf is not less equal than xSup.
     */
    public IntervalNumber(double xInf, double xSup)
    {
        SetBothInfSup(xInf, xSup);
    }

    /***
     * A default constructor that creates the interval number [0,1].
     */
    public IntervalNumber(){ 
    	this(0, 1);
    }

    /***
     * A method that set both parameters of the interval. It checks for the validity of the values.
     * @param xInf The inf value of the interval. It must be less equal than xSup.
     * @param xSup The sup value of the interval. It must be greater equal than xInf.
     * @exception IllegalArgumentException Thrown when xInf is not less equal than xSup.
     */
    public void SetBothInfSup(double xInf, double xSup)
    {
        if (xInf <= xSup)
        {
            inf = xInf;
            sup = xSup;
        }
        else
            throw new IllegalArgumentException("[inf sup] : inf must be less equal than sup");
    }
         
    /***
     * Calculates the degree of preference of an interval number
     * over another interval number according to Wang, Yang and Xu (2005) - Fuzzy Sets and Systems - 152 - 475-498.
     * @param other An interval number to be compared with the caller.
     * @return The degree of preference of the caller object (interval number) and the object.
     */
    public double DegreeOfPreferenceInterval(DataEntry other)
    {
        double max1, max2;
        IntervalNumber b = (IntervalNumber)other;

        if (inf == sup && b.inf == b.sup)
            throw new IllegalArgumentException("This definition is not applied in case of two degenerated interval");
        else
        {
            max1 = 0 > (sup - b.inf) ? 0 : (sup - b.inf);
            max2 = 0 > (inf - b.sup) ? 0 : (inf - b.sup);
            return (max1 - max2) / (sup - inf + b.sup - b.inf);
        }
    }

    /***
     * Calculates the mid point of the caller interval number.
     * @return The mid point of the interval.
     */
    public double MidPoint()
    {
        return (inf + sup) / 2;
    }
    /**
     * Calculates the Distance between the caller IntervalNumber and the parameter IntervalNumber.
     * @param other An IntervalNumber.
     * @return the distance measure. 
     */
    @Override
    public double Distance(DataEntry other)
    {
        IntervalNumber b = (IntervalNumber) other;
        return DistanceL1(this, b);
    }

    /**
     * Calculates the L1(modular)-distances between two interval numbers.
     * @param a An IntervalNumber object.
     * @param b An IntervalNumber object.
     * @return The L1-distance between IntervalNumber a and IntervalNumber b.
     * @exception IllegalArgumentException Thrown when one of the parameters is not an IntervalNumber object.
     */
    public static double DistanceL1(IntervalNumber a, IntervalNumber b)
    {
        if (a instanceof IntervalNumber && b instanceof IntervalNumber)
        {
            double dist = Math.abs(a.inf - b.inf) + Math.abs(a.sup - b.sup);
            return 0.5 * dist;
        }
        throw new IllegalArgumentException("Both parameters must be of type IntervalNumber.");
    }

    /***
     * Calculates the L2(quadratic)-distances between two interval numbers.
     * @param a An IntervalNumber object
     * @param b An IntervalNumber object
     * @return The L2-distance between IntervalNumber a and IntervalNumber b.
 	 * @exception IllegalArgumentException Thrown when one of the parameters is not an IntervalNumber object.
     */
    public static double DistanceL2(IntervalNumber a, IntervalNumber b)
    {
        if (a instanceof IntervalNumber && b instanceof IntervalNumber)
        {
            double dist = Math.pow((a.inf - b.inf), 2) + Math.pow((a.sup - b.sup), 2);
            dist *= 0.5;
            return Math.pow(dist, 0.5);
        }
        throw new IllegalArgumentException("Both parameters must be of type IntervalNumber.");
    }
    
    /***
     * Normalize the parameters of the object by dividing them by the parameter max.
     * @param max the value to be used to normalize the parameters.
     */
    @Override 
    public void NormalizeDataEntry(double min, double max, int benefit)
    {
    	if(benefit == 1){
    		SetBothInfSup((inf - min)/(max - min), (sup - min)/(max - min));
    	} else {
    		SetBothInfSup((max - sup)/(max - min), (max - inf)/(max - min));
    	}
    }

    /***
     * Gets the maximum possible value of the type.
     */
    @Override
    public double GetMax()
    {
        return sup;
    }
    
    /***
     * Gets the minimum possible value of the type.
     */
    @Override
    public double GetMin()
    {
        return inf;
    }


    /***
     * Compare the mid point of two interval numbers to determine which one is higher.
     * @param other An IntervalNumber object.
     * @return Returns 1 if the caller interval number mid point is bigger than the parameter other interval number mid point.
     * Returns 0 if the mid points are equal and returns -1 otherwise.
     */
    @Override
    public int compareTo(DataEntry other)
    {
        IntervalNumber b = (IntervalNumber) other;
        if (this.MidPoint() > b.MidPoint())
            return 1;
        else if (this.MidPoint() == b.MidPoint())
            return 0;

        return -1;
    }
    /***
     * @return Returns the string [inf, sup]
     */
    @Override
    public String toString()
    {
        return String.format("[%4.2f, %4.2f]", inf, sup);
    }
}
