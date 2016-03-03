package MCDM;

import org.json.*;

import DataType.*;

public class JSONRunner {
	public static String run(String strJSON){
		JSONObject mat = new JSONObject(strJSON);
		JSONObject result = new JSONObject();
		JSONArray closeness = new JSONArray();
		JSONArray criteria = mat.getJSONArray("criteria");
		double[] weights = new double[criteria.length()];
		int[] benefit = new int[criteria.length()];
		DataEntry[][] DM = new DataEntry[mat.getInt("nAlt")][mat.getInt("nCrit")];
		double[] CC;
		
		for(int i = 0; i < criteria.length(); i++){
			weights[i] = criteria.getJSONObject(i).getDouble("weight");
//			System.out.print(weights[i] + " ");
		}
		
//		System.out.println("");
		
		for(int i = 0; i < criteria.length(); i++){
			if(criteria.getJSONObject(i).getBoolean("benefit")){
				benefit[i] = 1;
			} else {
				benefit[i] = 0;
			}
//			System.out.print(benefit[i] + " ");
		}
		
//		System.out.println("");
		
		for(int i = 0; i < mat.getInt("nAlt"); i++){
			for(int j = 0; j < mat.getInt("nCrit"); j++){
				DM[i][j] = new Crisp(mat.getJSONArray("evaluation").getJSONArray(i).getDouble(j));
			}
		}
		
//		for (int i = 0; i < DM.length; i++){
//		    for (int j = 0; j < DM[1].length; j++)
//		    	System.out.printf(DM[i][j]+" ");
//		    System.out.printf("\n");
//	    }
//	    System.out.printf("\n\n"); 
	    
	    DataEntry.Normalize(DM, false);
		
		CC = TOPSIS.Modular(DM,weights,benefit,false);
		
		for(int i = 0; i < mat.getInt("nAlt"); i++){
			closeness.put(new JSONObject().put("name", mat.getJSONArray("alternatives").getJSONObject(i).getString("name")).
					put("coefficient", CC[i]));
		}
		
		result.put("closeness", closeness);
		
		return result.toString();
		
	}
}