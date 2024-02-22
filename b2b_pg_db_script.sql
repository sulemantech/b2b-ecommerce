--
-- PostgreSQL database dump
--

-- Dumped from database version 10.23
-- Dumped by pg_dump version 10.23

-- Started on 2024-02-20 11:29:52

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 1 (class 3079 OID 12924)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2989 (class 0 OID 0)
-- Dependencies: 1
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 213 (class 1259 OID 17280)
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    address character varying(255) NOT NULL,
    city character varying(255) NOT NULL,
    "stateId" integer NOT NULL,
    "zipCode" integer NOT NULL,
    country character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 17278)
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.addresses_id_seq OWNER TO postgres;

--
-- TOC entry 2990 (class 0 OID 0)
-- Dependencies: 212
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- TOC entry 223 (class 1259 OID 25747)
-- Name: businesses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.businesses (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255),
    email character varying(255) NOT NULL,
    "contactNumber" integer,
    description text,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.businesses OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 25745)
-- Name: businesses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.businesses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.businesses_id_seq OWNER TO postgres;

--
-- TOC entry 2991 (class 0 OID 0)
-- Dependencies: 222
-- Name: businesses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.businesses_id_seq OWNED BY public.businesses.id;


--
-- TOC entry 201 (class 1259 OID 16936)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 200 (class 1259 OID 16934)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 2992 (class 0 OID 0)
-- Dependencies: 200
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 209 (class 1259 OID 17230)
-- Name: cities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cities (
    id integer NOT NULL,
    "cityName" character varying(255) NOT NULL,
    "stateId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.cities OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 17228)
-- Name: cities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.cities_id_seq OWNER TO postgres;

--
-- TOC entry 2993 (class 0 OID 0)
-- Dependencies: 208
-- Name: cities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cities_id_seq OWNED BY public.cities.id;


--
-- TOC entry 217 (class 1259 OID 17340)
-- Name: companies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.companies (
    id integer NOT NULL,
    "companyName" character varying(255) NOT NULL,
    industry character varying(255) NOT NULL,
    "addressId" integer NOT NULL,
    description text,
    "contactInformation" character varying(255),
    website character varying(255),
    "industryType" character varying(255),
    "shippingInformation" text,
    "paymentMethods" character varying(255),
    "returnPolicy" text,
    status character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.companies OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 17337)
-- Name: companies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.companies_id_seq OWNER TO postgres;

--
-- TOC entry 2994 (class 0 OID 0)
-- Dependencies: 216
-- Name: companies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.id;


--
-- TOC entry 221 (class 1259 OID 25639)
-- Name: customers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.customers (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    address character varying(255),
    email character varying(255) NOT NULL,
    "contactNumber" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);


ALTER TABLE public.customers OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 25635)
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.customers_id_seq OWNER TO postgres;

--
-- TOC entry 2995 (class 0 OID 0)
-- Dependencies: 220
-- Name: customers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;


--
-- TOC entry 231 (class 1259 OID 26198)
-- Name: notificationConfigurations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."notificationConfigurations" (
    id integer NOT NULL,
    user_id integer NOT NULL,
    notification_type_id integer NOT NULL,
    is_enabled boolean DEFAULT true NOT NULL
);


ALTER TABLE public."notificationConfigurations" OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 26196)
-- Name: notificationConfigurations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."notificationConfigurations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."notificationConfigurations_id_seq" OWNER TO postgres;

--
-- TOC entry 2996 (class 0 OID 0)
-- Dependencies: 230
-- Name: notificationConfigurations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."notificationConfigurations_id_seq" OWNED BY public."notificationConfigurations".id;


--
-- TOC entry 227 (class 1259 OID 26081)
-- Name: notificationTypes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."notificationTypes" (
    id integer NOT NULL,
    "typeName" character varying(255) NOT NULL,
    description character varying(255)
);


ALTER TABLE public."notificationTypes" OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 26079)
-- Name: notificationTypes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."notificationTypes_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."notificationTypes_id_seq" OWNER TO postgres;

--
-- TOC entry 2997 (class 0 OID 0)
-- Dependencies: 226
-- Name: notificationTypes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."notificationTypes_id_seq" OWNED BY public."notificationTypes".id;


--
-- TOC entry 229 (class 1259 OID 26092)
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    notification_type_id integer NOT NULL,
    related_entity_type character varying(255) NOT NULL,
    related_entity_id integer NOT NULL,
    message character varying(255) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    is_read boolean DEFAULT false NOT NULL,
    sender_id integer,
    recipient_id integer,
    status character varying(255)
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 26090)
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.notifications_id_seq OWNER TO postgres;

--
-- TOC entry 2998 (class 0 OID 0)
-- Dependencies: 228
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- TOC entry 218 (class 1259 OID 17360)
-- Name: orderItems; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."orderItems" (
    "orderId" integer,
    "productId" integer,
    quantity integer,
    price integer,
    discount integer,
    "totalPrice" integer,
    "createdAt" date,
    "updatedAt" date,
    id integer NOT NULL,
    "vendorId" integer
);


ALTER TABLE public."orderItems" OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 17370)
-- Name: orderItems_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public."orderItems" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."orderItems_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 215 (class 1259 OID 17300)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "userId" integer NOT NULL,
    address character varying(255),
    "orderDate" timestamp with time zone,
    "totalPrice" numeric(10,2),
    status character varying(255),
    discount integer,
    "paymentMethod" character varying(255),
    "trackingNumber" integer,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    name character varying(255),
    email character varying(255),
    "contactNumber" integer,
    "zipCode" integer,
    "additionalInfo" character varying(1000),
    city character varying(30),
    country character varying(50)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 17296)
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."orders_orderId_seq" OWNER TO postgres;

--
-- TOC entry 2999 (class 0 OID 0)
-- Dependencies: 214
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- TOC entry 202 (class 1259 OID 16944)
-- Name: productCategories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productCategories" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productId" integer NOT NULL,
    "categoryId" integer NOT NULL
);


ALTER TABLE public."productCategories" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 17043)
-- Name: productImages; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productImages" (
    id integer NOT NULL,
    date timestamp with time zone,
    images character varying(255)[] NOT NULL,
    "productId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."productImages" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 17039)
-- Name: productImages_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productImages_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productImages_id_seq" OWNER TO postgres;

--
-- TOC entry 3000 (class 0 OID 0)
-- Dependencies: 203
-- Name: productImages_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productImages_id_seq" OWNED BY public."productImages".id;


--
-- TOC entry 225 (class 1259 OID 25769)
-- Name: productVariants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."productVariants" (
    id integer NOT NULL,
    type character varying(255),
    weight double precision,
    unit character varying(255),
    key character varying(255),
    value character varying(255),
    "availableQuantity" integer,
    "variantPrice" numeric(10,2),
    "productId" integer,
    "optionValues" jsonb
);


ALTER TABLE public."productVariants" OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 25767)
-- Name: productVariants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."productVariants_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."productVariants_id_seq" OWNER TO postgres;

--
-- TOC entry 3001 (class 0 OID 0)
-- Dependencies: 224
-- Name: productVariants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."productVariants_id_seq" OWNED BY public."productVariants".id;


--
-- TOC entry 199 (class 1259 OID 16876)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255),
    description text,
    price double precision,
    quantity integer,
    manufacturer character varying(255),
    "dateAdded" timestamp without time zone,
    discount integer,
    new boolean,
    rating integer,
    "saleCount" integer,
    tag character varying(255)[],
    stock integer,
    "quantityInStock" integer,
    sku character varying(255),
    "createdAt" timestamp without time zone,
    "updatedAt" timestamp without time zone,
    category_id integer,
    supplier_id integer,
    "categoryName" character varying,
    status character varying(255) DEFAULT 'active'::character varying
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 16874)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3002 (class 0 OID 0)
-- Dependencies: 198
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- TOC entry 207 (class 1259 OID 17220)
-- Name: states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.states (
    "stateName" character varying(255) NOT NULL,
    "stateCode" integer NOT NULL,
    "stateId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.states OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 17061)
-- Name: suppliers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.suppliers (
    supplier_id integer NOT NULL,
    supplier_name character varying(255) NOT NULL,
    contact_info character varying(255),
    contact_person character varying(255),
    website character varying(255),
    description text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "productId" integer
);


ALTER TABLE public.suppliers OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 17057)
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.suppliers_supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.suppliers_supplier_id_seq OWNER TO postgres;

--
-- TOC entry 3003 (class 0 OID 0)
-- Dependencies: 205
-- Name: suppliers_supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.suppliers_supplier_id_seq OWNED BY public.suppliers.supplier_id;


--
-- TOC entry 211 (class 1259 OID 17247)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    firstname character varying(255),
    lastname character varying(255),
    email character varying(255),
    password character varying(255),
    address character varying(255),
    "contactNumber" integer,
    "businessName" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone,
    role character varying,
    "customerId" integer,
    "businessId" integer
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 17243)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3004 (class 0 OID 0)
-- Dependencies: 210
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2789 (class 2604 OID 17283)
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- TOC entry 2793 (class 2604 OID 25750)
-- Name: businesses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.businesses ALTER COLUMN id SET DEFAULT nextval('public.businesses_id_seq'::regclass);


--
-- TOC entry 2784 (class 2604 OID 26224)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 2787 (class 2604 OID 17233)
-- Name: cities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities ALTER COLUMN id SET DEFAULT nextval('public.cities_id_seq'::regclass);


--
-- TOC entry 2791 (class 2604 OID 17343)
-- Name: companies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies ALTER COLUMN id SET DEFAULT nextval('public.companies_id_seq'::regclass);


--
-- TOC entry 2792 (class 2604 OID 25642)
-- Name: customers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);


--
-- TOC entry 2798 (class 2604 OID 26201)
-- Name: notificationConfigurations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationConfigurations" ALTER COLUMN id SET DEFAULT nextval('public."notificationConfigurations_id_seq"'::regclass);


--
-- TOC entry 2795 (class 2604 OID 26084)
-- Name: notificationTypes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationTypes" ALTER COLUMN id SET DEFAULT nextval('public."notificationTypes_id_seq"'::regclass);


--
-- TOC entry 2796 (class 2604 OID 26095)
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- TOC entry 2790 (class 2604 OID 17303)
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- TOC entry 2785 (class 2604 OID 26225)
-- Name: productImages id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImages" ALTER COLUMN id SET DEFAULT nextval('public."productImages_id_seq"'::regclass);


--
-- TOC entry 2794 (class 2604 OID 25772)
-- Name: productVariants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productVariants" ALTER COLUMN id SET DEFAULT nextval('public."productVariants_id_seq"'::regclass);


--
-- TOC entry 2783 (class 2604 OID 26226)
-- Name: products id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 2786 (class 2604 OID 26227)
-- Name: suppliers supplier_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers ALTER COLUMN supplier_id SET DEFAULT nextval('public.suppliers_supplier_id_seq'::regclass);


--
-- TOC entry 2788 (class 2604 OID 17250)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 2825 (class 2606 OID 17290)
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- TOC entry 2837 (class 2606 OID 25759)
-- Name: businesses businesses_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_email_key UNIQUE (email);


--
-- TOC entry 2839 (class 2606 OID 25757)
-- Name: businesses businesses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.businesses
    ADD CONSTRAINT businesses_pkey PRIMARY KEY (id);


--
-- TOC entry 2805 (class 2606 OID 16941)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 2815 (class 2606 OID 17237)
-- Name: cities cities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT cities_pkey PRIMARY KEY (id);


--
-- TOC entry 2829 (class 2606 OID 17348)
-- Name: companies companies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (id);


--
-- TOC entry 2833 (class 2606 OID 25649)
-- Name: customers customers_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_email_key UNIQUE (email);


--
-- TOC entry 2835 (class 2606 OID 25647)
-- Name: customers customers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);


--
-- TOC entry 2847 (class 2606 OID 26204)
-- Name: notificationConfigurations notificationConfigurations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationConfigurations"
    ADD CONSTRAINT "notificationConfigurations_pkey" PRIMARY KEY (id);


--
-- TOC entry 2843 (class 2606 OID 26089)
-- Name: notificationTypes notificationTypes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationTypes"
    ADD CONSTRAINT "notificationTypes_pkey" PRIMARY KEY (id);


--
-- TOC entry 2845 (class 2606 OID 26101)
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- TOC entry 2831 (class 2606 OID 17376)
-- Name: orderItems orderItems_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."orderItems"
    ADD CONSTRAINT "orderItems_pkey" PRIMARY KEY (id);


--
-- TOC entry 2827 (class 2606 OID 17308)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- TOC entry 2807 (class 2606 OID 16948)
-- Name: productCategories productCategories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories"
    ADD CONSTRAINT "productCategories_pkey" PRIMARY KEY ("productId", "categoryId");


--
-- TOC entry 2809 (class 2606 OID 17051)
-- Name: productImages productImages_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_pkey" PRIMARY KEY (id);


--
-- TOC entry 2841 (class 2606 OID 25779)
-- Name: productVariants productVariants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productVariants"
    ADD CONSTRAINT "productVariants_pkey" PRIMARY KEY (id);


--
-- TOC entry 2801 (class 2606 OID 16884)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 2803 (class 2606 OID 16886)
-- Name: products products_sku_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_sku_key UNIQUE (sku);


--
-- TOC entry 2813 (class 2606 OID 17227)
-- Name: states states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.states
    ADD CONSTRAINT states_pkey PRIMARY KEY ("stateId");


--
-- TOC entry 2811 (class 2606 OID 17069)
-- Name: suppliers suppliers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT suppliers_pkey PRIMARY KEY (supplier_id);


--
-- TOC entry 2817 (class 2606 OID 25656)
-- Name: users users_customerId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_customerId_key" UNIQUE ("customerId");


--
-- TOC entry 2819 (class 2606 OID 17259)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2821 (class 2606 OID 17257)
-- Name: users users_firstname_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_firstname_key UNIQUE (firstname);


--
-- TOC entry 2823 (class 2606 OID 17255)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2854 (class 2606 OID 17291)
-- Name: addresses addresses_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "addresses_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states("stateId") ON UPDATE CASCADE;


--
-- TOC entry 2852 (class 2606 OID 17238)
-- Name: cities cities_stateId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cities
    ADD CONSTRAINT "cities_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES public.states("stateId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2856 (class 2606 OID 17349)
-- Name: companies companies_addressId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT "companies_addressId_fkey" FOREIGN KEY ("addressId") REFERENCES public.addresses(id) ON UPDATE CASCADE;


--
-- TOC entry 2858 (class 2606 OID 26107)
-- Name: notifications fk_notification_notification_type_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT fk_notification_notification_type_id FOREIGN KEY (notification_type_id) REFERENCES public."notificationTypes"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2860 (class 2606 OID 26210)
-- Name: notificationConfigurations notificationConfigurations_notification_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationConfigurations"
    ADD CONSTRAINT "notificationConfigurations_notification_type_id_fkey" FOREIGN KEY (notification_type_id) REFERENCES public."notificationTypes"(id);


--
-- TOC entry 2859 (class 2606 OID 26205)
-- Name: notificationConfigurations notificationConfigurations_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."notificationConfigurations"
    ADD CONSTRAINT "notificationConfigurations_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 2857 (class 2606 OID 26102)
-- Name: notifications notifications_notification_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_notification_type_id_fkey FOREIGN KEY (notification_type_id) REFERENCES public."notificationTypes"(id);


--
-- TOC entry 2855 (class 2606 OID 17309)
-- Name: orders orders_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 2849 (class 2606 OID 16957)
-- Name: productCategories productCategories_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories"
    ADD CONSTRAINT "productCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public.categories(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2848 (class 2606 OID 16952)
-- Name: productCategories productCategories_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productCategories"
    ADD CONSTRAINT "productCategories_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2850 (class 2606 OID 17052)
-- Name: productImages productImages_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."productImages"
    ADD CONSTRAINT "productImages_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2851 (class 2606 OID 17070)
-- Name: suppliers suppliers_productId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.suppliers
    ADD CONSTRAINT "suppliers_productId_fkey" FOREIGN KEY ("productId") REFERENCES public.products(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 2853 (class 2606 OID 25657)
-- Name: users users_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "users_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public.customers(id);


-- Completed on 2024-02-20 11:29:52

--
-- PostgreSQL database dump complete
--

