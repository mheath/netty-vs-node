import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.handler.codec.http.HttpRequestDecoder;
import org.jboss.netty.handler.codec.http.HttpRequestEncoder;
import org.jboss.netty.handler.codec.http.HttpResponseEncoder;

/**
 * @author Mike Heath <heathma@ldschurch.org>
 */
public class HttpServerPipelineFactory implements ChannelPipelineFactory {
	public ChannelPipeline getPipeline() throws Exception {
		ChannelPipeline pipeline = Channels.pipeline();
		pipeline.addLast("decoder", new HttpRequestDecoder());
		pipeline.addLast("encoder", new HttpResponseEncoder());
		pipeline.addLast("handler", new HttpRequestHandler());
		return  pipeline;
	}
}
