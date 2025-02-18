import io.github.bonigarcia.wdm.WebDriverManager;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.AfterTest;
import org.testng.annotations.BeforeTest;
import org.testng.annotations.Test;

public class TestDemo {
    WebDriver driver;

    @BeforeTest
    public void init() {
        WebDriverManager.chromedriver().setup();
        driver = new ChromeDriver();
        driver.get("https://demo.guru99.com/V4/");
    }

    @Test
    public void test() {

    }

    @AfterTest
    public void tearDown() {
        driver.quit();
    }
}

