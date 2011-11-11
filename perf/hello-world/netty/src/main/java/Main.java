import org.jboss.netty.bootstrap.ServerBootstrap;
import org.jboss.netty.channel.socket.nio.NioServerSocketChannelFactory;

import java.net.InetSocketAddress;
import java.util.concurrent.Executors;

/**
 * @author Mike Heath <heathma@ldschurch.org>
 */
public class Main {
	public static void main(String[] args) {
		ServerBootstrap bootstrap = new ServerBootstrap(new NioServerSocketChannelFactory(
				Executors.newCachedThreadPool(),
				Executors.newCachedThreadPool(), 1
		));
		bootstrap.setPipelineFactory(new HttpServerPipelineFactory());

		bootstrap.bind(new InetSocketAddress(8080));

		System.out.println("Server started");
	}
}
