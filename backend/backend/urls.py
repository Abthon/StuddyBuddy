from django.contrib import admin
from django.urls import path
from drf_spectacular.views import SpectacularAPIView,SpectacularSwaggerView
from server.views import ServerListViewSet,CategoryListViewSet, ServerListView
from rest_framework.routers import DefaultRouter
from django.conf import settings
from django.conf.urls.static import static
from webchat.consumer import WebChatConsumer
from webchat.views import MessageListViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from account.views import (
    AccountViewSet,
    JWTCookieTokenObtainPairView,
    JWTCookieTokenRefreshView,
    LogOutAPIView,
    RegisterView,
)

router = DefaultRouter()
router.register('api/server/select', ServerListViewSet)
router.register('api/category/select', CategoryListViewSet)
router.register('api/message/select', MessageListViewSet)
router.register('api/user/select', AccountViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/server/filter/', ServerListView.as_view()),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/schema/swagger-ui/', SpectacularSwaggerView.as_view(), name='swagger-ui'),
    path("api/token/", JWTCookieTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", JWTCookieTokenRefreshView.as_view(), name="token_refresh"),
    path("api/logout/", LogOutAPIView.as_view(), name="logout"),
    path("api/register/", RegisterView.as_view(), name="register"),
] + router.urls


websocket_urlpatterns = [path("<str:serverId>/<str:channelId>/", WebChatConsumer.as_asgi())]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)