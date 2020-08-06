package cn.com.oims.common;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Hashtable;
import javax.imageio.ImageIO;

public class QcodeUtils {
  private static final int BLACK = -16777216;
  
  private static final int WHITE = -1;
  
  public static void main(String[] args) {
    String text = "你好";
    int width = 100;
    int height = 100;
    String format = "png";
    Hashtable hints = new Hashtable();
    hints.put(EncodeHintType.CHARACTER_SET, "utf-8");
    try {
      BitMatrix bitMatrix = (new MultiFormatWriter()).encode(text, BarcodeFormat.QR_CODE, width, height, hints);
      File outputFile = new File("new.png");
      writeToFile(bitMatrix, format, outputFile);
    } catch (WriterException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
  }
  
  public static boolean generateCodeImg(File file, String msg, BarcodeFormat format, int width, int height, String charset) {
    Hashtable hints = new Hashtable();
    hints.put(EncodeHintType.CHARACTER_SET, charset);
    boolean re = false;
    try {
      String ext = file.getName().substring(file.getName().lastIndexOf(".") + 1);
      BitMatrix bitMatrix = (new MultiFormatWriter()).encode(msg, format, width, height, hints);
      int[] rec = bitMatrix.getEnclosingRectangle();
      int resWidth = rec[2] + 1;
      int resHeight = rec[3] + 1;
      BitMatrix resMatrix = new BitMatrix(resWidth, resHeight);
      resMatrix.clear();
      for (int i = 0; i < resWidth; i++) {
        for (int j = 0; j < resHeight; j++) {
          if (bitMatrix.get(i + rec[0], j + rec[1])) {
            resMatrix.set(i, j);
          }
        } 
      } 
      writeToFile(resMatrix, ext, file);
      re = true;
    } catch (WriterException e) {
      e.printStackTrace();
    } catch (IOException e) {
      e.printStackTrace();
    } 
    return re;
  }
  
  public static BufferedImage toBufferedImage(BitMatrix matrix) {
    int width = matrix.getWidth();
    int height = matrix.getHeight();
    BufferedImage image = new BufferedImage(width, height, 1);
    for (int x = 0; x < width; x++) {
      for (int y = 0; y < height; y++) {
        image.setRGB(x, y, matrix.get(x, y) ? -16777216 : -1);
      }
    } 
    return image;
  }
  
  public static void writeToFile(BitMatrix matrix, String format, File file) throws IOException {
    BufferedImage image = toBufferedImage(matrix);
    if (!ImageIO.write(image, format, file)) {
      throw new IOException("Could not write an image of format " + format + " to " + file);
    }
  }
  
  public static void writeToStream(BitMatrix matrix, String format, OutputStream stream) throws IOException {
    BufferedImage image = toBufferedImage(matrix);
    if (!ImageIO.write(image, format, stream)) {
      throw new IOException("Could not write an image of format " + format);
    }
  }
}
