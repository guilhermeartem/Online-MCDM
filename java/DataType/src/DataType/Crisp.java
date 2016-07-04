package DataType;
/***
 * @author Rodolfo Lourenzutti
 * Date 06/07/2014
 * This class represent a crisp (real) number.
 */
public class Crisp extends DataEntry
{
    /***
     * A real value.
     */
    double value;

    /***
     *  Constructs the class with the value to be represented.
     * @param xValue The value to be represented.
     */
    public Crisp(double xValue)
    {
        value = xValue;
    }
    
    /***
     * Normalize the Crisp class by dividing the field <paramref name="value"/> 
     * by the parameter.
     * @param max The supremum value to be used to normalize the data parameters.
     */
    @Override 
    public void NormalizeDataEntry(double min, double max, int benefit)
    {
    	if(benefit == 1){
    		value = (value - min)/(max - min);
    	} else {
    		value = (max - value)/(max - min);
    	}
        
    }

    /***
     * Return the field value.
     */
    @Override
    public double GetMax()
    {
        return value;
    }
    
    /***
     * Return the field value.
     */
    @Override
    public double GetMin()
    {
        return value;
    }

    /***
     * Calculates the L1-Distance (absolute difference) between two value.
     * @param other A Crisp object which the distance must be calculated from.
     * @return The difference between the caller and other.
     */
    @Override
    public double Distance(DataEntry other)
    {
        Crisp b = (Crisp)other;
        return Math.abs(value - b.value);
    }

    /***
     * Compares two Crisp objects.
     * @param other Another DataEntry object to be compared.
     * @return Return 1 if caller.value is greater than other.value;
     * Return 0 if caller.value is equal to other.value;
     * Return -1 if caller.value is smaller than other.value;
     */
    @Override
    public int compareTo(DataEntry other)
    {
        Crisp b = (Crisp)other;
        if (value > b.value)
            return 1;
        else if (value == b.value)
            return 0;
        return -1;
    }

    @Override
    public String toString()
    {
        return String.format("%7.2f", value);
    }
}