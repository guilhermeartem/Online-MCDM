package MCDM;

import org.json.*;

import DataType.*;

public class JSONRunner {
	public static String run(String strJSON){
		JSONObject mat = new JSONObject(strJSON);
		JSONArray result = new JSONArray();
		JSONArray methods = new JSONArray();
		JSONArray closenessTopsis = new JSONArray();
		JSONArray closenessTodim = new JSONArray();
		JSONArray criteria = mat.getJSONArray("criteria");
		double[] weights = new double[criteria.length()];
		int[] benefit = new int[criteria.length()];
		DataEntry[][] DM = new DataEntry[mat.getInt("nAlt")][mat.getInt("nCrit")];
		double[] CCTopsis, CCTodim;
		
		methods = mat.getJSONArray("methodOptions");
		
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
				
		for(int i = 0; i < mat.getInt("nAlt"); i++){
			for(int j = 0; j < mat.getInt("nCrit"); j++){
				if(criteria.getJSONObject(j).getString("type").compareTo("crisp") == 0){
					DM[i][j] = new Crisp(mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(0));
				} else if(criteria.getJSONObject(j).getString("type").compareTo("interval") == 0){
					DM[i][j] = new IntervalNumber(mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(0), mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(1));
				} else if(criteria.getJSONObject(j).getString("type").compareTo("fuzzy") == 0){
					DM[i][j] = new TrapezoidalFuzzyNumber(new double[] {mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(0),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(1),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(1),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(2)});
				} else if(criteria.getJSONObject(j).getString("type").compareTo("z-number") == 0){
					DM[i][j] = (new TrapezoidalZNumber(new double[] {mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(0),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(1),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(1),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(2)},
							new double[] {mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(3),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(4),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(4),
							mat.getJSONArray("evaluation").getJSONArray(i).getJSONArray(j).getDouble(5)})).ConvertToFuzzy();
				}
			}
		}
		
//		for (int i = 0; i < DM.length; i++){
//		    for (int j = 0; j < DM[1].length; j++)
//		    	System.out.printf(DM[i][j]+" ");
//		    System.out.printf("\n");
//	    }
//	    System.out.printf("\n\n"); 
	    
	    DataEntry.Normalize(DM, false);
	    
	    for(int j = 0; j < methods.length(); j++){
	    	if(methods.getJSONObject(j).getString("method").compareTo("topsis") == 0){
	    		CCTopsis = TOPSIS.Modular(DM,weights,benefit,false);
				closenessTopsis = new JSONArray();
				for(int i = 0; i < mat.getInt("nAlt"); i++){
					closenessTopsis.put(new JSONObject().put("name", mat.getJSONArray("alternatives").getJSONObject(i).getString("name")).
							put("coefficient", CCTopsis[i]));
				}
				
				result.put(new JSONObject().put("method", "topsis").put("closeness", closenessTopsis));
				
	    	} else if(methods.getJSONObject(j).getString("method").compareTo("todim") == 0){
	    		
	    		CCTodim = TODIM.Modular(DM,weights,methods.getJSONObject(j).optDouble("theta"), benefit,true);
	    		closenessTodim = new JSONArray();
				for(int i = 0; i < mat.getInt("nAlt"); i++){
					closenessTodim.put(new JSONObject().put("name", mat.getJSONArray("alternatives").getJSONObject(i).getString("name")).
							put("coefficient", CCTodim[i]));
				}
				
				result.put(new JSONObject().put("method", "todim").put("theta", methods.getJSONObject(j).optDouble("theta")).put("closeness", closenessTodim));
				
	    	}
	    }
	    
//	    if(mat.getJSONObject("methodOptions").getBoolean("topsis")){
//	    	
//	    	CCTopsis = TOPSIS.Modular(DM,weights,benefit,false);
//			
//			for(int i = 0; i < mat.getInt("nAlt"); i++){
//				closenessTopsis.put(new JSONObject().put("name", mat.getJSONArray("alternatives").getJSONObject(i).getString("name")).
//						put("coefficient", CCTopsis[i]));
//			}
//			
//			result.put("closenessTopsis", closenessTopsis);
//	    	
//	    }
//	    
//	    if(mat.getJSONObject("methodOptions").getBoolean("todim")){
//	    	
//	    	CCTodim = TODIM.Modular(DM,weights,theta, benefit,false);
//			
//			for(int i = 0; i < mat.getInt("nAlt"); i++){
//				closenessTodim.put(new JSONObject().put("name", mat.getJSONArray("alternatives").getJSONObject(i).getString("name")).
//						put("coefficient", CCTodim[i]));
//			}
//			
//			result.put("closenessTodim", closenessTodim);
//	    	
//	    }
//		
		return new JSONObject().put("results", result).toString();		
		
	}
}
