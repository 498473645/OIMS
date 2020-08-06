package cn.com.oims.service.impl;

import cn.com.oims.dao.IFixedAssetsDao;
import cn.com.oims.dao.pojo.FixedAssets;
import cn.com.oims.dao.pojo.MaintainRecord;
import cn.com.oims.service.IFixedAssetsService;
import cn.com.oims.web.form.FixedAssetsSearchForm;
import cn.com.oims.web.form.MaintainRecordForm;
import com.codesnet.common.Page;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import jxl.Cell;
import jxl.Sheet;
import jxl.Workbook;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class FixedAssetsServiceImpl implements IFixedAssetsService {
  @Autowired
  private IFixedAssetsDao dao;
  
  public Map<String, Object> findFixedAssets(FixedAssetsSearchForm form, Page page) {
    List<FixedAssets> list = this.dao.findFixedAssets(form, page);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public void saveOrUpdateFixedAssets(FixedAssets form, String gonghao) {
    FixedAssets fa;
    if (form.getId() == null) {
      fa = new FixedAssets();
      fa.setInputDate(new Date());
      fa.setInputUser(gonghao);
      if (form.getFlowerNo() != null && !form.getFlowerNo().isEmpty() && this.dao.getFixedAssetsByNo(form.getFlowerNo()) != null)
        throw new RuntimeException("此设备(设备编号：" + form.getFlowerNo() + ")已存在"); 
    } else {
      fa = this.dao.getFixedAssets(form.getId());
      if (fa == null)
        throw new RuntimeException("设备不存在！"); 
      if (form.getFlowerNo() != null && !form.getFlowerNo().isEmpty() && !form.getFlowerNo().equals(fa.getFlowerNo()))
        throw new RuntimeException("此设备(设备编号：" + form.getFlowerNo() + ")已存在"); 
      fa.setUpdateDate(new Date());
      fa.setUpdateUser(gonghao);
    } 
    BeanUtils.copyProperties(form, fa);
    Integer serviceLife = Integer.valueOf((int)form.getServiceLife().floatValue());
    if (serviceLife != null && form.getSetupDate() != null) {
      Calendar cal = Calendar.getInstance();
      cal.setTime(form.getSetupDate());
      cal.set(1, cal.get(1) + serviceLife.intValue());
      fa.setExpireDate(cal.getTime());
    } 
    this.dao.saveOrUpdateFixedAssets(fa);
  }
  
  public FixedAssets getFixedAssetsById(Integer id) {
    return this.dao.getFixedAssets(id);
  }
  
  public boolean setScrapFlag(Integer id, Boolean scrapFlag) {
    FixedAssets fa = this.dao.getFixedAssets(id);
    if (fa == null)
      return false; 
    fa.setScrapFlag(scrapFlag.booleanValue());
    Date date = scrapFlag.booleanValue() ? new Date() : null;
    fa.setScrapDate(date);
    this.dao.saveOrUpdateFixedAssets(fa);
    return true;
  }
  
  public Map<String, Object> findFixedAssetsInMaintainTime(int days, Page page) {
    Calendar cal = Calendar.getInstance();
    cal.set(5, cal.get(5) - days);
    FixedAssetsSearchForm form = new FixedAssetsSearchForm();
    form.setNextMaintenanceDate(cal.getTime());
    return findFixedAssets(form, page);
  }
  
  @Transactional
  public void saveOrUpdateMaintainRecord(MaintainRecordForm form, String gonghao) {
    MaintainRecord mr;
    FixedAssets fa = this.dao.getFixedAssets(form.getFixedAssetsId());
    if (fa == null)
      throw new RuntimeException("设备不存在！"); 
    fa.setNextMaintenanceDate(form.getNextMaintenanceDate());
    this.dao.saveOrUpdateFixedAssets(fa);
    if (form.getId() == null) {
      mr = new MaintainRecord();
      mr.setInputDate(new Date());
      mr.setInputUser(gonghao);
    } else {
      mr = this.dao.getMaintainRecord(form.getId());
      if (mr == null)
        throw new RuntimeException("维护记录不存在！"); 
      mr.setUpdateDate(new Date());
      mr.setUpdateUser(gonghao);
    } 
    BeanUtils.copyProperties(form, mr);
    this.dao.saveOrUpdateMaintainRecord(mr);
  }
  
  public List<MaintainRecord> findMaintainRecords(Integer fixedAssetsId) {
    return this.dao.findMaintainRecords(fixedAssetsId);
  }
  
  public void delFixedAsset(Integer id) {
    FixedAssets fa = this.dao.getFixedAssets(id);
    List<MaintainRecord> maintainRecords = this.dao.findMaintainRecords(id);
    for (MaintainRecord maintainRecord : maintainRecords)
      this.dao.delMaintainRecord(maintainRecord); 
    this.dao.delFixedAssets(fa);
  }
  
  public MaintainRecord getMaintainRecordById(Long id) {
    return this.dao.getMaintainRecord(id);
  }
  
  public void delMaintainRecord(Long id) {
    MaintainRecord mr = this.dao.getMaintainRecord(id);
    this.dao.delMaintainRecord(mr);
  }
  
  public void updateFixedAssets(FixedAssets fa) {
    this.dao.updateFixedAssets(fa);
  }
  
  public void saveFixedAssets(FixedAssets fa) {
    this.dao.saveFixedAssets(fa);
  }
  
  public Map<String, Object> findFixedAssetsList(FixedAssetsSearchForm form, Page page) {
    List<FixedAssets> list = this.dao.findFixedAssetsList(form, page);
    Map<String, Object> map = new HashMap<>();
    map.put("list", list);
    map.put("page", page);
    return map;
  }
  
  public int[] importFixedAssetsFromExcel(File file, String user) {
    InputStream stream = null;
    Workbook book = null;
    int[] x = new int[2];
    try {
      stream = new FileInputStream(file);
      book = Workbook.getWorkbook(stream);
      Sheet[] sheets = book.getSheets();
      byte b;
      int i;
      Sheet[] arrayOfSheet1;
      for (i = (arrayOfSheet1 = sheets).length, b = 0; b < i; ) {
        Sheet sheet = arrayOfSheet1[b];
        x[0] = x[0] + sheet.getRows() - 1;
        for (int j = 1; j < sheet.getRows(); j++) {
          Cell c = sheet.getCell(2, j);
          String no = c.getContents();
          if (no != null && !no.isEmpty()) {
            FixedAssets fixedAssets = this.dao.getFixedAssetsByNo(no);
            if (fixedAssets != null)
              continue; 
          } 
          FixedAssets fa = new FixedAssets();
          if (!no.isEmpty())
            fa.setFlowerNo(no); 
          int category = getCategory(sheet.getCell(1, j).getContents());
          fa.setCategory(Integer.valueOf(category));
          fa.setName(sheet.getCell(3, j).getContents());
          fa.setGuige(sheet.getCell(4, j).getContents());
          fa.setXinghao(sheet.getCell(5, j).getContents());
          Float price = null;
          try {
            price = Float.valueOf(Float.parseFloat(sheet.getCell(6, j).getContents()));
          } catch (Exception exception) {}
          fa.setPrice(price);
          fa.setLocal(sheet.getCell(7, j).getContents());
          fa.setManufacturer(sheet.getCell(8, j).getContents());
          fa.setContacts(sheet.getCell(9, j).getContents());
          fa.setTel(sheet.getCell(10, j).getContents());
          fa.setMobile(sheet.getCell(11, j).getContents());
          fa.setFax(sheet.getCell(12, j).getContents());
          fa.setMail(sheet.getCell(13, j).getContents());
          fa.setSupplier(sheet.getCell(14, j).getContents());
          fa.setSupporter(sheet.getCell(15, j).getContents());
          fa.setSupporttel(sheet.getCell(16, j).getContents());
          fa.setSupportmobile(sheet.getCell(17, j).getContents());
          fa.setSupportfax(sheet.getCell(18, j).getContents());
          fa.setSupportmail(sheet.getCell(19, j).getContents());
          fa.setInfomation(sheet.getCell(20, j).getContents());
          fa.setMaintenanceNotice(sheet.getCell(21, j).getContents());
          fa.setInputDate(new Date());
          fa.setInputUser(user);
          this.dao.saveFixedAssets(fa);
          x[1] = x[1] + 1;
          continue;
        } 
        b++;
      } 
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      if (book != null)
        book.close(); 
      if (stream != null)
        try {
          stream.close();
          file.delete();
        } catch (IOException iOException) {} 
      file.delete();
    } 
    return x;
  }
  
  private int getCategory(String contents) {
    int category = 6;
    if ("医疗设备".equals(contents)) {
      category = 1;
    } else if ("信息化设备".equals(contents)) {
      category = 2;
    } else if ("文体设备".equals(contents)) {
      category = 3;
    } else if ("营房营具".equals(contents)) {
      category = 4;
    } else if ("通信设备".equals(contents)) {
      category = 5;
    } 
    return category;
  }
}
