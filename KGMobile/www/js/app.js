angular.module('starter', ['ionic','ngCordova','ngAnimate','ds.clock','auth0','ngMap','nvd3','ngLetterAvatar','toastr'])
.run(function($ionicPlatform,$window,$rootScope,$cordovaStatusbar,$cordovaSQLite,StorageService,$location,auth) 
{
    auth.hookEvents();
    $ionicPlatform.ready(function() 
    {
        var notificationOpenedCallback = function(jsonData) 
        {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };

        window.plugins.OneSignal
          .startInit("d98b487a-66ce-4118-a715-2b4a9d6dd5ec")
          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();
    
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) 
        {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
            
        }
        $cordovaStatusbar.show();

        window.plugins.speechRecognition.isRecognitionAvailable(function(available)
        {
            if(available)
            {
                console.log("Radumta");
            }
        }, 
        function(err)
        {
            console.error(err);
        });
        
    })

    $rootScope.db = window.openDatabase("rasasayang.db", "1.0", "Your App", 2000000000000);
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Stores (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,STORE_NM TEXT,ACCESS_ID TEXT,UUID TEXT,PLAYER_ID TEXT,PROVINCE_ID INTEGER,PROVINCE_NM TEXT,CITY_ID INTEGER,CITY_NAME TEXT,ALAMAT TEXT,PIC TEXT,TLP TEXT,FAX TEXT,STATUS INTEGER,START TEXT, END TEXT,DCRP_DETIL TEXT,INDUSTRY_ID INTEGER,INDUSTRY_NM TEXT,INDUSTRY_GRP_ID INTEGER,INDUSTRY_GRP_NM TEXT,LONGITUDE TEXT,LATITUDE TEXT)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Transaksis (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,ACCESS_ID TEXT,CASHIER_NAME TEXT,OPENCLOSE_ID TEXT,TRANS_ID TEXT,SPLIT_TRANS_ID TEXT,TRANS_DATE TEXT,TOTAL_PRODUCT INTEGER,SUB_TOTAL_HARGA INTEGER,PPN INTEGER,TOTAL_HARGA INTEGER,DO_KEM_TYPE INTEGER,DO_KEM INTEGER,TYPE_PAY_ID INTEGER,TYPE_PAY_NM TEXT,BANK_ID INTEGER,BANK_NM TEXT,MERCHANT_ID TEXT,MERCHANT_NM TEXT,MERCHANT_NO TEXT,CONSUMER_ID INTEGER,CONSUMER_NM TEXT,CONSUMER_EMAIL TEXT,CONSUMER_PHONE TEXT,STATUS INTEGER,DCRP_DETIL TEXT,TRANS_REF TEXT,TRANS_TYPE INTEGER,CONSTRAINT transid_unique UNIQUE (TRANS_ID))');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_ShopCart (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,TRANS_DATE TEXT,ACCESS_GROUP TEXT,ACCESS_ID TEXT,GOLONGAN TEXT,STORE_ID TEXT,TRANS_TYPE INTEGER,TRANS_ID TEXT,PRODUCT_ID TEXT,PRODUCT_NM TEXT,PRODUCT_PROVIDER TEXT,PRODUCT_PROVIDER_NO TEXT,PRODUCT_PROVIDER_NM TEXT,UNIT_ID TEXT,UNIT_NM TEXT,HARGA_JUAL INTEGER,HPP INTEGER,PPN INTEGER,DISCOUNT TEXT,QTY_INCART INTEGER,PROMO TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_ShopCartRefund (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,TRANS_DATE TEXT,ACCESS_GROUP TEXT,ACCESS_ID TEXT,GOLONGAN TEXT,STORE_ID TEXT,TRANS_TYPE INTEGER,TRANS_ID TEXT,PRODUCT_ID TEXT,PRODUCT_NM TEXT,PRODUCT_PROVIDER TEXT,PRODUCT_PROVIDER_NO TEXT,PRODUCT_PROVIDER_NM TEXT,UNIT_ID TEXT,UNIT_NM TEXT,HARGA_JUAL INTEGER,HPP INTEGER,PPN INTEGER,DISCOUNT TEXT,QTY_INCART INTEGER,PROMO TEXT,STATUS INTEGER)');
    

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Product_Groups (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,ACCESS_GROUP TEXT,STORE_ID TEXT,GROUP_ID TEXT,GROUP_NM TEXT,STATUS INTEGER,NOTE TEXT)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Products (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,GROUP_ID TEXT,GROUP_NM TEXT,PRODUCT_ID TEXT,PRODUCT_QR TEXT,PRODUCT_NM TEXT,CURRENT_HPP INTEGER,CURRENT_STOCK INTEGER,HARGA_JUAL INTEGER,CURRENT_PPN INTEGER,CURRENT_DISCOUNT INTEGER,CURRENT_PROMO TEXT,PRODUCT_WARNA TEXT,PRODUCT_SIZE TEXT,PRODUCT_SIZE_UNIT TEXT,PRODUCT_HEADLINE TEXT,UNIT_ID TEXT,UNIT_NM TEXT,STOCK_LEVEL INTEGER,INDUSTRY_ID INTEGER,INDUSTRY_NM TEXT,INDUSTRY_GRP_ID INTEGER,INDUSTRY_GRP_NM TEXT,STATUS INTEGER,DCRP_DETIL TEXT,IMG_FILE TEXT,IS_FAVORITE INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Product_Stocks (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,ID_SERVER INTEGER,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,PRODUCT_ID TEXT,LAST_STOCK INTEGER,INPUT_STOCK INTEGER,CURRENT_STOCK INTEGER,SISA_STOCK INTEGER,INPUT_DATE TEXT,INPUT_TIME TEXT,CURRENT_DATE TEXT,CURRENT_TIME TEXT,DCRP_DETIL TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Product_Images (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,PRODUCT_ID TEXT,PRODUCT_IMAGE TEXT,STATUS INTEGER,DCRP_DETIL TEXT)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Product_Hargas (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,ID_SERVER INTEGER,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,PRODUCT_ID TEXT,HARGA_JUAL INTEGER,PERIODE_TGL1 TEXT,PERIODE_TGL2 TEXT,START_TIME TEXT,DCRP_DETIL TEXT,STATUS INTEGER)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Customers (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,CUSTOMER_ID TEXT,NAME TEXT,EMAIL TEXT,PHONE TEXT,DCRP_DETIL TEXT,STATUS INTEGER)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Merchants(ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,TYPE_PAY_ID INTEGER,TYPE_PAY_NM TEXT,BANK_ID INTEGER,BANK_NM TEXT,MERCHANT_ID TEXT,MERCHANT_NO TEXT,MERCHANT_NM TEXT,MERCHANT_TOKEN TEXT,MERCHANT_URL TEXT,DCRP_DETIL TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_MerchantTypes(ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,TYPE_PAY_ID INTEGER,TYPE_PAY_NM TEXT,DCRP_DETIL TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_MerchantBanks(ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,BANK_ID INTEGER,BANK_NM TEXT,DCRP_DETIL TEXT,STATUS INTEGER)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Karyawans (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,KARYAWAN_ID TEXT,NAMA_DPN TEXT,NAMA_TGH TEXT,NAMA_BLK TEXT,KTP TEXT,TMP_LAHIR TEXT,TGL_LAHIR TEXT,GENDER TEXT,ALAMAT TEXT,STS_NIKAH TEXT,TLP TEXT,HP TEXT,EMAIL TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_KaryawanAbsensis (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,OFLINE_ID TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,KARYAWAN_ID TEXT,TGL TEXT,WAKTU TEXT,LATITUDE TEXT,LONGITUDE TEXT,STATUS INTEGER,DCRP_DETIL,ABSEN_IMAGE TEXT)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_OpenCloseBook (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,ACCESS_ID TEXT,OPENCLOSE_ID TEXT,SPLIT_OPENCLOSE_ID TEXT,TGL_OPEN TEXT,TGL_CLOSE TEXT,CASHINDRAWER INTEGER,ADDCASH INTEGER,SELLCASH INTEGER,TOTALCASH INTEGER,TOTALDONASI INTEGER,TOTALREFUND INTEGER,TOTALCASH_ACTUAL INTEGER,STATUS INTEGER,CONSTRAINT opencloseid_unique UNIQUE (OPENCLOSE_ID))');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_SaveBill (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,ACCESS_ID TEXT,TRANS_ID TEXT,ALIAS_TRANS_ID TEXT,NOMOR_MEJA TEXT)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Setoran (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,ACCESS_GROUP TEXT,STORE_ID TEXT,ACCESS_ID TEXT,OPENCLOSE_ID TEXT,SPLIT_OPENCLOSE_ID TEXT,TGL_STORAN TEXT,TOTALCASH INTEGER,NOMINAL_STORAN INTEGER,SISA_STORAN INTEGER,BANK_NM TEXT,BANK_NO TEXT,CREATE_AT TEXT,STATUS INTEGER,DCRP_DETIL TEXT,STORAN_IMAGE TEXT)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_RegProvinsis (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,PROVINCE_ID INTEGER,PROVINCE TEXT)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_RegKotas (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,PROVINCE_ID INTEGER,PROVINCE TEXT,CITY_ID INTEGER,CITY_NAME TEXT,TYPE TEXT,POSTAL_CODE INTEGER)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_SyncLocal (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,NAMA_TABEL TEXT,PRIMARY_KEY TEXT,TYPE_ACTION INTEGER,STATUS_SYNC INTEGER)');

    
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_PPOBGroups (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,KELOMPOK_ID TEXT,KELOMPOK TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_PPOBKategoris (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,KELOMPOK_ID TEXT,KELOMPOK TEXT,KTG_ID INTEGER,KTG_NM TEXT,KETERANGAN TEXT,STATUS INTEGER)');
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_PPOBProducts (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,CODE TEXT,DENOM INTEGER,HARGA_JUAL INTEGER,ID_CODE INTEGER,ID_PRODUK TEXT,KELOMPOK TEXT,KTG_ID INTEGER,KTG_NM TEXT,NAME TEXT,TYPE_NM TEXT)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_ShopCartPPOB (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,TGL_SAVE TEXT,TRANS_DATE TEXT,ACCESS_GROUP TEXT,ACCESS_ID TEXT,STORE_ID TEXT,TRANS_ID TEXT,PEMBAYARAN,MSISDN TEXT,ID_PELANGGAN TEXT,CODE TEXT,DENOM INTEGER,HARGA_JUAL INTEGER,ID_CODE INTEGER,ID_PRODUK TEXT,KELOMPOK TEXT,KTG_ID INTEGER,KTG_NM TEXT,NAME TEXT,TYPE_NM TEXT,STATUS_BELI INTEGER)');

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_PerangkatStore (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,ACCESS_GROUP TEXT,STORE_ID TEXT,STORE_NM TEXT,KASIR_ID TEXT,KASIR_NM TEXT,PERANGKAT_UUID TEXT,KASIR_STT INTEGER,KASIR_STT_NM TEXT,DOMPET_AUTODEBET INTEGER,DOMPET_AUTODEBET_NM TEXT,PAYMENT_METHODE INTEGER,PAYMENT_METHODE_NM TEXT,DATE_START TEXT,DATE_END TEXT,STATUS INTEGER,STATUS_NM TEXT,PAKET_GROUP TEXT,PAKET_ID INTEGER,PAKET_NM TEXT,PAKET_DURATION INTEGER,PAKET_DURATION_BONUS INTEGER,HARGA_BULAN INTEGER,HARGA_HARI INTEGER,HARGA_PAKET INTEGER,HARGA_PAKET_HARI INTEGER,PAKET_STT INTEGER,PAKET_STT_NM TEXT)');
    
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_PerangkatPaket (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,PAKET_GROUP TEXT,PAKET_ID INTEGER,PAKET_NM TEXT,PAKET_DURATION INTEGER,PAKET_DURATION_BONUS INTEGER,HARGA_BULAN INTEGER,HARGA_HARI INTEGER,HARGA_PAKET INTEGER,HARGA_PAKET_HARI INTEGER,PAKET_STT INTEGER,PAKET_STT_NM TEXT)');
    

    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_UserOperasional (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,ACCESS_GROUP TEXT,STORE_ID TEXT,ACCESS_ID TEXT,ACCESS_LEVEL TEXT,username TEXT,email TEXT,password TEXT,status INTEGER)');
    
    $cordovaSQLite.execute($rootScope.db, 'CREATE TABLE IF NOT EXISTS Tbl_Product_Units (ID_LOCAL INTEGER PRIMARY KEY AUTOINCREMENT,UNIT_ID TEXT,UNIT_NM TEXT,UNIT_ID_GRP INTEGER,UNIT_NM_GRP TEXT,STATUS INTEGER,DCRP_DETIL TEXT,CREATE_UUID TEXT,UPDATE_UUID TEXT)');
    
    if($window.screen.width > 760)
    {
        StorageService.set('screenbesar',true);
    }
    else
    {
        StorageService.set('screenbesar',false);
    }

    $rootScope.$on('$stateChangeStart', function (event,next, nextParams, fromState) 
    {
        var token   = StorageService.get('advanced-profile');
        if (!token) 
        {
          $location.path('/auth/login');
          console.log();
        }
    }); 
})
.config(function ($sceDelegateProvider,$ionicConfigProvider,$ionicConfigProvider,authProvider,toastrConfig) 
{
    angular.extend(toastrConfig, 
    {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 1,    
        newestOnTop: true,
        positionClass: 'toast-bottom-center',
        preventDuplicates: false,
        preventOpenDuplicates: false,
        target: 'body',
        progressBar: true,
        closeButton: false,
        timeOut: 3000,
      });
    
    authProvider.init({domain: 'kontrolgampang.auth0.com',clientID: '5u9uQKCQdeusiA8jwbYldiDqREs4A5h2',callbackURL: location.href,loginState: 'auth.login' });
    $sceDelegateProvider.resourceUrlWhitelist(['self', new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')]);
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.navBar.alignTitle('center');
    $ionicConfigProvider.views.maxCache(0);
    // $ionicConfigProvider.scrolling.jsScrolling(false);
})
.controller('AppCtrl', 
function(ConnectivityMonitor,TemplateCssService,MenuService,StorageService,SecuredFac,UtilService,$ionicActionSheet,$cordovaCamera,$cordovaImagePicker,$location,$ionicLoading,$timeout,$ionicHistory,$scope) 
{
    $scope.$on('$ionicView.beforeEnter', function()
    {
        TemplateCssService.ChangeTemplate();
    });
    
    ConnectivityMonitor.isOnline();
    ConnectivityMonitor.startWatching();
    
    
    var parameters        = UtilService.GetParameters();
    $scope.profileops     = StorageService.get('advanced-profile');
    $scope.userusername   = parameters.username;
    $scope.userimages     = 'img/save-image.png';
    SecuredFac.GetImageUserOps(parameters)
    .then(function(responseuserimages)
    {
      $scope.userimages   = responseuserimages.ACCESS_IMAGE;
      
    }); 

    if($scope.profileops.ACCESS_LEVEL == 'OWNER')
    {
        $scope.groups = MenuService.GetMenuAdmin();
    }
    else if($scope.profileops.ACCESS_LEVEL == 'OPS')
    {
        $scope.groups   = MenuService.GetMenuOperasional();
    }

    $scope.changeprofile = function()
    {
        $ionicActionSheet.show
        ({
          titleText: 'Ambil Gambar Melalui?',
          buttons: [
            { text: '<i class="icon ion-image"></i> Galeri' },
            { text: '<i class="icon ion-ios-camera-outline"></i> Kamera'}
          ],
          buttonClicked: function(index) 
          {
            if(index == 0)
            {
                document.addEventListener("deviceready", function () 
                {
                    var options = {maximumImagesCount: 1, width: 800,height: 800,quality: 80};
                    $cordovaImagePicker.getPictures(options)
                    .then(function (results) 
                    {
                        for (var i = 0; i < results.length; i++) 
                        {
                            $scope.userimages = results[i];
                            window.plugins.Base64.encodeFile($scope.userimages, function(base64)
                            {
                                $ionicLoading.show
                                ({
                                    template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
                                    noBackdrop:true
                                })
                                .then(function()
                                {
                                    var parameters          = UtilService.GetParameters();
                                    parameters.ACCESS_IMAGE = base64;
                                    SecuredFac.CreateImageUserOps(parameters)
                                    .then(function(responseuserimages)
                                    {
                                        $scope.userimages   = parameters.ACCESS_IMAGE;
                                    })
                                    .finally(function()
                                    {
                                      $ionicLoading.hide();
                                    });
                                });
                            });
                        }
                    });
                }, false);
            }
            else if(index == 1)
            {
                document.addEventListener("deviceready", function () 
                {
                    var options = UtilService.CameraOptions();
                    $cordovaCamera.getPicture(options)
                    .then(function (imageData) 
                    {
                        $ionicLoading.show
                        ({
                            template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
                            noBackdrop:true
                        })
                        .then(function()
                        {
                            var parameters          = UtilService.GetParameters();
                            parameters.ACCESS_IMAGE = 'data:image/jpeg;base64,' + imageData;
                            SecuredFac.CreateImageUserOps(parameters)
                            .then(function(responseuserimages)
                            {
                                $scope.userimages   = parameters.ACCESS_IMAGE;
                            })
                            .finally(function()
                            {
                                $ionicLoading.hide();
                            });
                        });
                    });
                }, false);
            }
            return true;
          }
        });
    }

    $scope.logout = function() 
    {
        // $timeout.cancel(pollingservertolocal);
        // $timeout.cancel(pollingofflinelocal);
        StorageService.destroy('advanced-profile');
        StorageService.destroy('basic-parameters');
        $ionicLoading.show({template: '<p class="item-icon-left"><span class="title">Loading</span><ion-spinner icon="lines"/></p>',duration:1000});
        $timeout(function () 
        {
              $ionicLoading.hide();
              $ionicHistory.clearCache();
              $ionicHistory.clearHistory();
              $ionicHistory.nextViewOptions({ disableBack: true, historyRoot: true });
              $location.path('/auth/login');
          }, 1500);
    };

    $scope.toggleGroup = function(group) 
    {
        if(group.items)
        {
            if ($scope.isGroupShown(group)) 
            {
                $scope.shownGroup = null;
            } 
            else 
            {
                $scope.shownGroup = group;
            }
        }
        else
        {
            $scope.shownGroup = group;
        }
    };
    
    $scope.isGroupShown = function(group) 
    {
        return $scope.shownGroup === group;
    };
    
})
