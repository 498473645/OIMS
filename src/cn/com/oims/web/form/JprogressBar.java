package cn.com.oims.web.form;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Toolkit;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import javax.swing.JButton;
import javax.swing.JFileChooser;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JProgressBar;

public class JprogressBar extends JFrame implements Runnable {
  private JButton btCopy;
  
  private JFileChooser openFileDialog;
  
  private JProgressBar copyFileProgressBar;
  
  private File savePath;
  
  private boolean stop;
  
  public JprogressBar() {
    this.savePath = null;
    this.stop = false;
    initUI();
  }
  
  private void initUI() {
    this.btCopy = new JButton("open file....");
    JButton btCancel = new JButton("cancel");
    JButton btSavePath = new JButton("save Path...");
    this.copyFileProgressBar = new JProgressBar(0, 100);
    this.copyFileProgressBar.setPreferredSize(new Dimension(450, 15));
    this.copyFileProgressBar.setBackground(Color.GREEN);
    this.copyFileProgressBar.setForeground(Color.PINK);
    this.copyFileProgressBar.setStringPainted(true);
    this.copyFileProgressBar.setVisible(false);
    this.openFileDialog = new JFileChooser(".");
    setLayout(new BorderLayout());
    JPanel tmpPanel1 = new JPanel();
    JPanel tmpPanel2 = new JPanel();
    this.btCopy.addActionListener(new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            Thread t = new Thread(JprogressBar.this);
            t.start();
          }
        });
    btSavePath.addActionListener(new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            JprogressBar.this.savePath = JprogressBar.this.setSavePath();
          }
        });
    btCancel.addActionListener(new ActionListener() {
          public void actionPerformed(ActionEvent e) {
            JprogressBar.this.stop = true;
            JprogressBar.this.btCopy.setEnabled(true);
          }
        });
    tmpPanel1.add(this.btCopy);
    tmpPanel1.add(btSavePath);
    tmpPanel1.add(btCancel);
    tmpPanel2.add(this.copyFileProgressBar);
    add(tmpPanel1, "North");
    add(tmpPanel2, "South");
    setTitle("read and copy file");
    setPreferredSize(new Dimension(450, 95));
    pack();
    Dimension cd = centerIt(this);
    setLocation(cd.width, cd.height);
    final Dimension des = getPreferredSize();
    addWindowListener(new WindowAdapter() {
          public void windowClosing(WindowEvent e) {
            JprogressBar.this.stop = true;
            System.exit(0);
          }
          
          public void windowStateChanged(WindowEvent e) {
            System.out.println("ss");
            if (e.paramString().equals("WINDOW_STATE_CHANGED")) {
              System.out.println("ss");
              JprogressBar.this.setSize(des);
            } 
          }
        });
    addPropertyChangeListener(new PropertyChangeListener() {
          public void propertyChange(PropertyChangeEvent evt) {}
        });
  }
  
  public void run() {
    this.stop = false;
    int c = this.openFileDialog.showOpenDialog(this);
    if (c == 0)
      try {
        File selectFile = this.openFileDialog.getSelectedFile();
        if (selectFile.equals(this.savePath)) {
          JOptionPane.showMessageDialog(this, "  \t target file and source file can't as the same !");
          return;
        } 
        if (this.savePath == null) {
          JOptionPane.showMessageDialog(this, "  \t please select a path to save file !");
          return;
        } 
        this.btCopy.setEnabled(false);
        this.copyFileProgressBar.setVisible(true);
        long size = selectFile.length();
        this.copyFileProgressBar.setMaximum((int)size);
        FileInputStream fin = new FileInputStream(selectFile);
        FileOutputStream fout = new FileOutputStream(this.savePath);
        byte[] buff = new byte[1024];
        int count = 0;
        long startTime = System.currentTimeMillis();
        int s;
        while ((s = fin.read(buff)) > 0 && !this.stop) {
          count += s;
          fout.write(buff, 0, s);
          double d = 100.0D * count / (size + 0.01D);
          String str1 = forMatString(d + "");
          long endTime = System.currentTimeMillis();
          String speedStr = getSpeed(count, startTime, endTime);
          String remailTime = getRemailTime(count, size, startTime, endTime);
          this.copyFileProgressBar.setString(" precent:   " + str1 + " %" + "    speed: " + speedStr + "    " + " remail  time : " + remailTime);
          this.copyFileProgressBar.setValue(count);
        } 
        fin.close();
        fout.close();
        if (!this.stop)
          JOptionPane.showMessageDialog(this, "  \t copy file complete  !"); 
        this.stop = true;
        this.savePath = null;
        this.btCopy.setEnabled(true);
        this.copyFileProgressBar.setValue(0);
        this.copyFileProgressBar.setString("");
        this.copyFileProgressBar.setVisible(false);
      } catch (Exception ex) {
        JOptionPane.showMessageDialog(this, "err:\n" + ex.getMessage());
      }  
  }
  
  private File setSavePath() {
    File path = null;
    int c = this.openFileDialog.showSaveDialog(this);
    if (c == 0)
      path = this.openFileDialog.getSelectedFile(); 
    return path;
  }
  
  private Dimension centerIt(Component c) {
    Dimension size = c.getSize();
    Dimension screenSize = Toolkit.getDefaultToolkit().getScreenSize();
    int sH = screenSize.height;
    int sW = screenSize.width;
    int cW = size.width;
    int cH = size.height;
    return new Dimension((sW - cW) / 2, (sH - cH) / 2);
  }
  
  private String getSpeed(long readByte, long startTime, long endTime) {
    if (endTime - startTime != 0L) {
      long speed = readByte / (endTime - startTime) * 1000L;
      if (speed > 1048576L)
        return String.valueOf(forMatString((new StringBuilder(String.valueOf(speed / 1048576.1D))).toString())) + " m/s"; 
      if (speed > 1024L)
        return String.valueOf(forMatString((new StringBuilder(String.valueOf(speed / 1024.1D))).toString())) + " k/s"; 
      return String.valueOf(speed) + " b/s";
    } 
    return "0 b/s";
  }
  
  private String forMatString(String str) {
    int index = str.indexOf(".");
    String values = str.substring(0, index + 3);
    return values;
  }
  
  private String getRemailTime(long readByte, long totalByte, long startTime, long endTime) {
    try {
      long speed = readByte / (endTime - startTime);
      long time = (totalByte - readByte) / speed / 1000L;
      long hour = time / 3600L;
      long minute = time % 3600L / 60L;
      long second = time % 3600L % 60L;
      String h = (new StringBuilder(String.valueOf(hour))).toString();
      String m = (new StringBuilder(String.valueOf(minute))).toString();
      String s = (new StringBuilder(String.valueOf(second))).toString();
      if (hour < 10L)
        m = "0" + minute; 
      if (minute < 10L)
        m = "0" + minute; 
      if (second < 10L)
        s = "0" + second; 
      return String.valueOf(h) + ":" + m + ":" + s;
    } catch (Exception ex) {
      return "00:00:00";
    } 
  }
  
  public static void main(String[] args) {
    JprogressBar frm = new JprogressBar();
    frm.setVisible(true);
  }
}
