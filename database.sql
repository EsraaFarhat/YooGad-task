CREATE DATABASE YooGadTask;

CREATE Table category(
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(255),
    parentId Integer REFERENCES category,
    ts timestamp
);

CREATE Table product(
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255),
    price Integer,
    ts timestamp
);

CREATE Table seller(
    seller_id SERIAL PRIMARY KEY,
    seller_name VARCHAR(255),
    ts timestamp
);