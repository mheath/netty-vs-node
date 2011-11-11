import org.jboss.netty.buffer.ChannelBuffer;
import org.jboss.netty.buffer.ChannelBuffers;
import org.jboss.netty.channel.ChannelFuture;
import org.jboss.netty.channel.ChannelFutureListener;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.MessageEvent;
import org.jboss.netty.channel.SimpleChannelUpstreamHandler;
import org.jboss.netty.handler.codec.http.DefaultHttpResponse;
import org.jboss.netty.handler.codec.http.HttpHeaders;
import org.jboss.netty.handler.codec.http.HttpRequest;
import org.jboss.netty.handler.codec.http.HttpResponse;
import org.jboss.netty.handler.codec.http.HttpResponseStatus;
import org.jboss.netty.handler.codec.http.HttpVersion;

/**
 * @author Mike Heath <heathma@ldschurch.org>
 */
public class HttpRequestHandler extends SimpleChannelUpstreamHandler {

	private ChannelBuffer content = ChannelBuffers.directBuffer(4096);

	public HttpRequestHandler() {
		content.writeBytes("Hello world!".getBytes());
	}

	@Override
	public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) throws Exception {
		HttpRequest request = (HttpRequest) e.getMessage();
		boolean keepAlive = HttpHeaders.isKeepAlive(request);
		HttpResponse response = new DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK);
		response.setHeader(HttpHeaders.Names.CONTENT_TYPE, "text/plain");
		if (keepAlive) {
			response.setHeader(HttpHeaders.Names.CONTENT_LENGTH, content.writerIndex());
		}
		response.setContent(content);
		final ChannelFuture future = e.getChannel().write(response);
		if (!keepAlive) {
			future.addListener(ChannelFutureListener.CLOSE);
		}

	}
}
