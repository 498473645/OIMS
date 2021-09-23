package cn.com.oims.common;

import java.io.File;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * 本类用于 处理、检查导入数据的格式还有判断路径是否为文件
 * @author 王林
 */
public class CheckTeleFormat {
	/**
	 * 验证手机号码、电话号码是否有效 手机号前面加86的情况也考虑 新联通 　 *（中国联通+中国网通）手机号码开头数字
	 * 130、131、132、145、155、156、185、186 　　 * 新移动 　　 * （中国移动+中国铁通）手机号码开头数字
	 * 134、135、136、137、138、139、147、150、151、152、157、158、159、182、183、187、188 　　 *
	 * 新电信 　　 * （中国电信 <http://baike.baidu.com/view/3214.htm>+中国卫通）手机号码开头数字
	 * 133、153、189、180 座机： 3/4位区号（数字）+ “-” + 7/8位（数字）+ “-”+数字位数不限
	 * 说明：“-”+数字位数不限；这段可有可无
	 */
	public static String checkphone(String photo) {
		if (null != photo && !"".equals(photo)) {
			String reisphoto = photo.replace("，", ",").replace(";", ",")
					.replace("；", ",").replace("　", ",").replace(" ", ",")
					.replace("/", ",").replace("\\", ",");
			String[] photo1 = reisphoto.split(",");
			String[] photo2 = new String[photo1.length];
			boolean isfirst;
			if (null != photo1 && photo1.length > 0) {
				for (int i = 0; i < photo1.length; i++) {
					isfirst = false;
					if (photo1[i]
							.matches("(^[0-9]{3,4}-[0-9]{3,8}$)|^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|2|3|5|6|7|8|9])\\d{8}$")) {
						photo2[i] = photo1[i];
						isfirst = true;
					}
					// 第二规则 “-”+数字位数不限 和手机号前面加86的情况也考虑
					if (!isfirst) {
						if (photo1[i]
								.matches("(^[0-9]{3,4}-[0-9]{3,8}-[0-9]{0,100}$)|^((\\+86)|(86))?(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|2|3|5|6|7|8|9])\\d{8}$")) {
							photo2[i] = photo1[i];
						}
					}
				}
				// 如果两个电话 只用一个
				if (photo2.length > 0) {
					return photo2[0];
				}
			}
		}
		return null;
	}

	/**
	 * 判断得到的不为空的邮箱是否匹配标准格式，如果匹配返回true不匹配返回false 字符串不能为null或者为“”
	 * 
	 * @param s
	 * @return
	 */
	public static boolean checkemail(String s) {
		boolean b = false;
		if (s != null && !s.equals("")) {
			if (s.matches("(?=^[\\w.@]{6,50}$)\\w+@\\w+(?:\\.[\\w]{2,3}){1,2}"))
				b = true;
			else
				b = false;
		}
		return b;
	}

	/**
	 * 判断字符串能否转为Integer，Long数据类型
	 * 
	 * @param args
	 */
	public static boolean checkStringToInt(String s) {
		boolean b = true;
		if (s != null && !s.equals("")) {
			if (s.matches("^[0-9]+$")) {
				b = true;
			} else
				b = false;
		}
		return b;
	}

	/**
	 * 验证邮编是否符合标准格式
	 * 
	 * @param s
	 * @return
	 */
	public static boolean checkPostcode(String s) {
		boolean b = true;
		if (s != null && !s.equals("")) {
			if (s.matches("^[0-9]{6}$"))
				b = true;
			else
				b = false;
		}
		return b;
	}

	/**
	 * @description:判断时间是否匹配
	 * @param s
	 * @return: 
	 * @author: Mason
	 * @time: 2020/6/10 10:03
	 */
	public static Date checkDate(String s) {
		if (s.indexOf(".") != -1)
			s = s.substring(0, s.lastIndexOf("."));
		Date b = null;
		SimpleDateFormat dfa = new SimpleDateFormat("yyyy-MM-dd HH:mm:SS");
		SimpleDateFormat dfb = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		SimpleDateFormat dfc = new SimpleDateFormat("yyyy-MM-dd");
		if(!s.equals("null")&&!s.equals("")){
		try {
			b = dfa.parse(s);
		} catch (ParseException e) {
			try {
				b = dfb.parse(s);
			} catch (ParseException e1) {
				try {
					b = dfc.parse(s);
				} catch (ParseException e2) {
				}
			}
		}
		}
		else  if(s.equals("")||s.equals("null")){
			b=null;
		}
			
		return b;
	}
	
	/**
	 * @description:
	 * @param s
	 * @return: 
	 * @author: Mason
	 * @time: 2020/6/10 10:32
	 */
    public static String getDateString(String s){

		if (s.indexOf(".") != -1)
			s = s.substring(0, s.lastIndexOf("."));
		String  b = "";
		SimpleDateFormat dfc = new SimpleDateFormat("yyyy-MM-dd");
		if(!s.equals("null")&&!s.equals("")){
			b=s.substring(0,s.lastIndexOf(" "));
		}
		else  if(s.equals("")||s.equals("null")){
			b=dfc.format(new Date());
		}
			
		return b;
    }
    
	/**
	 * @description:检查路径是否是文件名称
	 * @time: 2020/6/10 10:03
	 */
	public static boolean checkFileName(String s) {
		boolean b = false;
		File f = new File(s);
		if (f.isFile())
			b = true;
		return b;
	}


}
