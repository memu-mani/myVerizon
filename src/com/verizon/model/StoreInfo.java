package com.verizon.model;

public class StoreInfo
{
    private Stores[] store;

    public Stores[] getStore ()
    {
        return store;
    }

    public void setStore (Stores[] store)
    {
        this.store = store;
    }

    @Override
    public String toString()
    {
        return "ClassPojo [store = "+store+"]";
    }
}