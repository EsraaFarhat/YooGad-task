CREATE DATABASE YooGadTask;


-- \c YooGadTask

CREATE Table category(
    category_id SERIAL PRIMARY KEY,
    category_name TEXT NOT NULL CHECK (length(category_name) <= 50),
    parentId Integer REFERENCES category ON DELETE CASCADE,
    ts timestamp default now()
);

CREATE Table seller(
    seller_id SERIAL PRIMARY KEY,
    seller_name TEXT NOT NULL CHECK (length(seller_name) <= 50),
    ts timestamp default now()
);

CREATE Table product(
    product_id SERIAL PRIMARY KEY,
    product_name TEXT NOT NULL CHECK (length(product_name) <= 50),
    price numeric NOT NULL CHECK (price <= 1000 AND price > 0),
    ts timestamp default now(),
    seller_id Integer REFERENCES seller ON DELETE CASCADE
);

CREATE Table product_category(
    product_id Integer REFERENCES product ON DELETE CASCADE,
    category_id Integer REFERENCES category ON DELETE CASCADE,
    ts timestamp default now()
);

INSERT INTO category (category_name, parentId) VALUES 
        ('food', null),
        ('fruits', 1),
        ('vehicles', null), 
        ('sports', null), 
        ('computers', null),    
        ('laptops', 5), 
        ('monitors', 5), 
        ('vegetables', 1),
        ('cars', 3);

INSERT INTO seller (seller_name) VALUES 
        ('ahmed'),
        ('mohamed'),
        ('ali'), 
        ('esraa'), 
        ('asmaa');