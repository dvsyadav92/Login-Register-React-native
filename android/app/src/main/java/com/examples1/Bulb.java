package com.examples1;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
public class Bulb extends ReactContextBaseJavaModule  {
    private static Boolean isOn = false;
    public Bulb(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @ReactMethod
    public void getStatus(Callback successCallback) {
        successCallback.invoke(null, isOn);

    }

    @ReactMethod
    public void turnOn() {
        isOn = true;
                Toast.makeText(getCurrentActivity(), "clicked", Toast.LENGTH_SHORT).show();
        System.out.println("Bulb is turn ON");
    }
    @ReactMethod
    public void turnOff() {
        isOn = false;
        System.out.println("Bulb is turn OFF");
    }

    @Override
    public String getName() {
        return "Bulb";
    }
     @ReactMethod
    public void showAlert(final Callback successCallback){
        // Toast.makeText(getCurrentActivity()," "+successCallback,
                                // Toast.LENGTH_SHORT).show();

        successCallback.invoke(" call back clicked ");
        AlertDialog.Builder builder = new AlertDialog.Builder(getCurrentActivity());

        //Uncomment the below code to Set the message and title from the strings.xml file  
        builder.setMessage("Android Native Code") .setTitle("Title of android native code");

        //Setting message manually and performing action on button click  
        builder.setMessage("Do you want to close this application ?")
                .setCancelable(false)
                .setPositiveButton("Yes", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        successCallback.invoke("no");
                        getCurrentActivity().finish();
                        // Toast.makeText(getCurrentActivity(),"you choose yes action for alertbox",
                                // Toast.LENGTH_SHORT).show();
                                
                    }
                })
                .setNegativeButton("No", new DialogInterface.OnClickListener() {
                    public void onClick(DialogInterface dialog, int id) {
                        //  Action for 'NO' Button  
                       
                        // Toast.makeText(getCurrentActivity(),"you choose no action for alertbox",
                                // Toast.LENGTH_SHORT).show();
                                 successCallback.invoke("Yes");
                                  dialog.cancel();
                    }
                });
        //Creating dialog box  
        AlertDialog alert = builder.create();
        //Setting the title manually  
        alert.setTitle("AlertDialogExample");
        alert.show();
    }

}