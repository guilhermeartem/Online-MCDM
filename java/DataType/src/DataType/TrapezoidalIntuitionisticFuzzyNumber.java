package DataType;

/***
 * @author Rodolfo Lourenzutti
 *  This class represents a Trapezoidal Intuitionistic Fuzzy Number (TIFN).
 */
public class TrapezoidalIntuitionisticFuzzyNumber extends DataEntry
{
 
	/***
	 * The maximum of the membership function.
	 */
    private double muTilde;
    
    /***
     * The minimum of the non-membership function.
     */
    private double nuTilde; 

    /***
     * Array of parameters of the membership function.
     */
    private double[] a = new double[4]; 

    /***
     * Array of parameters of the non-membership function.
     */
    private double[] b = new double[4]; 


    /***
     * A constructor where every parameter of the TIFN must be defined.
     * @param a Array of parameters of the membership function. This array must contain four elements.
     * @param b Array of parameters of the membership function. This array must contain four elements.
     * @param muTilde A value that defines the maximum of the membership function.
     * @param nuTilde A value that defines the minimum of the non-membership function.
     * @exception IllegalArgumentException Thrown when the inequality b[0]<=a[0]<=b[1]<=a[1]<=a[2]<=b[2]<=a[3]<b[3] is not satisfied.
     */
    public TrapezoidalIntuitionisticFuzzyNumber(double[] a, double[] b, double muTilde, double nuTilde)
    {
        SetAllParameters(a, b, muTilde, nuTilde);
    }

    /***
     * A constructor where only the parameter of the membership function must be defined. The parameters
     * of the non-membership function will be the same as the ones of the membership functions and 
     * muTilde and nuTilde will be 1 and 0, respectively.
     * @param a The parameter of the membership function.
     */
    public TrapezoidalIntuitionisticFuzzyNumber(double[] a){
    	this(a, a, 1, 0);
    }

    /***
     * A method that set all parameters of the TIFN.
     * @param a Array of parameters of the membership function. This array must contain four elements.
     * @param b Array of parameters of the membership function. This array must contain four elements.
     * @param muTilde A value that defines the maximum of the membership function.
     * @param nuTilde A value that defines the minimum of the non-membership function.
     * @exception IllegalArgumentException Thrown when the inequality b[0]<=a[0]<=b[1]<=a[1]<=a[2]<=b[2]<=a[3]<b[3] is not satisfied or 0<=muTilde+nuTilde<=1.
     */
    private void SetAllParameters(double[] a, double[] b, double muTilde, double nuTilde)
    {
        if ((muTilde >= 0 && muTilde <= 1) && (nuTilde >= 0 && nuTilde <= 1) && (muTilde + nuTilde <= 1))
        {
            this.muTilde = muTilde;
            this.nuTilde = nuTilde;
        }
        else
            throw new IllegalArgumentException("muTilde and nuTilde must be in [0,1] such that muTilde + nuTilde <= 1");

        if ((a[0] <= a[1] && a[1] <= a[2] && a[2] <= a[3]) && (b[0] <= b[1] && b[1] <= b[2] && b[2] <= b[3]) &&
                (b[0] <= a[0] && a[0] <= b[1] && b[1] <= a[1] && a[2] <= b[2] && b[2] <= a[3] && a[3] <= b[3]))
        {
            for (int i = 0; i < 4; i++)
            {
                this.a[i] = a[i];
                this.b[i] = b[i];
            }

        }

        else
            throw new IllegalArgumentException("The parameters must satisfy b[1]<=a[1]<=b[2]<=a[2]<=a[3]<=b[3]<=a[4]<=b[4]");
    }

    /**
     * Calculates the Score function of a TIFN as defined in Lourenzutti and Krohling (2013) - Expert Systems with Application.
     * @return The Score value.
     */
    public double Score()
    {
        double E_mu, E_nu = 0;

        E_mu = (a[3] + a[2]) * (a[3] + a[2]) - (a[1] + a[0]) * (a[1] + a[0]) - a[3] * a[2] + a[1] * a[0];
        E_mu /= (3 * (a[1] - a[0]) + 6 * (a[2] - a[1]) + 3 * (a[3] - a[2]));

        if (b[0] != b[1])
            E_nu += (2 * Math.pow(a[0], 3) * (nuTilde - 1) + 3 * a[0] * a[0] * (b[1] - nuTilde * b[0]) - b[1] * b[1] * (-3 * nuTilde * b[0] + 2 * nuTilde * b[1] + b[1])) / (6 * (b[0] - b[1]));

        E_nu += -nuTilde * b[1] * b[1] / 2 + nuTilde * b[2] * b[2] / 2 - (b[2] - b[3]) * (2 * nuTilde * b[2] + b[2] + b[3] * (nuTilde + 2)) / 6 - b[3] * b[3] / 2 + 0.5;

        return muTilde * E_mu - E_nu;
    }

    /**
     * Calculates the membership degree for a determined value x.
     * @param x The value which is desired to know the membership degree.
     * @return The membership degree of the argument x.
     */
    public double Membership(double x)
    {
        if (a[0] < x && x < a[1])
            return muTilde * (x - a[1]) / (a[2] - a[1]);
        else if (a[1] <= x && x <= a[2])
            return muTilde;
        else if (a[3] < x && x < a[4])
            return muTilde * (a[4] - x) / (a[4] - a[3]);
        else
            return 0;
    }

    /**
     * Calculates the non-membership degree for a determined value x.
     * @param x The value which is desired to know the membership degree.
     * @return The membership degree of the argument x.
     */
    public double NonMembership(double x)
    {
        if (b[0] < x && x < b[1])
            return (1 - nuTilde) * (x - b[0]) / (b[0] - b[1]);
        else if (b[1] <= x && x <= b[2])
            return nuTilde;
        else if (b[2] < x && x < b[3])
            return (1 - nuTilde) * (x - b[3]) / (b[3] - b[2]);
        else
            return 1;
    }

    @Override
    public String toString()
    {
        return String.format("<(%4.2f, %4.2f, %4.2f, %4.2f), (%4.2f, %4.2f, %4.2f, %4.2f), %4.2f, %4.2f>", a[0], a[1], a[2], a[3], b[0], b[1], b[2], b[3], muTilde, nuTilde);
    }

    /**
     * @see NormalizeDataEntry.
     */
    @Override
    public void NormalizeDataEntry(double max)
    {
        double[] a, b;
        a = new double[4];
        b = new double[4];
        for (int i = 0; i < 4; i++)
        {
            a[i] = this.a[i] / max;
            b[i] = this.b[i] / max;
        }

        SetAllParameters(a, b, this.muTilde, this.nuTilde);
    }
    
    /// <summary>
    /// 
    /// </summary>
    /**
     * This method return the supremum value that is possible to have
     * a membership degree >= 0, i.e., it returns b[3].
     */
    @Override
    public double GetMax()
    {
        return b[3];
    }
    
    /**
     * Calculates the distance between two TIFN 
     * proposed in Lourenzutti and Krohling (2014) - Knowledge Based Systems.
     * @param otherIFS A TIFN object.
     * @return The distance measure.
     */
    @Override
    public double Distance(DataEntry otherIFS)
    {
        TrapezoidalIntuitionisticFuzzyNumber other = (TrapezoidalIntuitionisticFuzzyNumber)otherIFS;
        
        double dist = 0;

        dist += Math.abs(a[0] - other.a[0]);
        dist += (1 + Math.abs(muTilde - other.muTilde)) * Math.abs(a[1] - other.a[1]);
        dist += (1 + Math.abs(muTilde - other.muTilde)) * Math.abs(a[2] - other.a[2]);
        dist += Math.abs(a[3] - other.a[3]);

        dist += Math.abs(b[0] - other.b[0]);
        dist += (1 + Math.abs(nuTilde - other.nuTilde)) * Math.abs(b[1] - other.b[1]);
        dist += (1 + Math.abs(nuTilde - other.nuTilde)) * Math.abs(b[2] - other.b[2]);
        dist += Math.abs(b[3] - other.b[3]);

        return dist / 8;
    }


    /**
     * Comapares two TIFN according to their Score value. 
     */
    @Override
    public int compareTo(DataEntry otherIFS)
    {
        TrapezoidalIntuitionisticFuzzyNumber other = (TrapezoidalIntuitionisticFuzzyNumber)otherIFS;
        if (Score() > other.Score())
            return 1;
        else if (Score() == other.Score())
            return 0;
        else
            return -1;
    }
}