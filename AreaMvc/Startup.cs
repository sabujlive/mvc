using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AreaMvc.Startup))]
namespace AreaMvc
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
