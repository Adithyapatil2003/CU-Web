CREATE TYPE "public"."order_status_enum" AS ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."payment_status_enum" AS ENUM('pending', 'paid', 'failed', 'refunded');--> statement-breakpoint
CREATE TYPE "public"."product_type_enum" AS ENUM('nfc_card', 'review_card');--> statement-breakpoint
CREATE TYPE "public"."profile_theme" AS ENUM('default', 'dark', 'light', 'colorful', 'minimal');--> statement-breakpoint
CREATE TYPE "public"."user_role_enum" AS ENUM('user', 'admin', 'super_admin');--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_account" (
	"userId" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"providerAccountId" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "ConnectionUnlimited_account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_analytics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"profile_id" varchar(255) NOT NULL,
	"event_type" text DEFAULT 'general' NOT NULL,
	"event_category" text DEFAULT 'engagement',
	"event_action" text DEFAULT 'unknown' NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"session" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"user_journey" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"performance" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"conversion" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"emailVerified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"role" "user_role_enum" DEFAULT 'user' NOT NULL,
	"permissions" text[] DEFAULT '{}'::text[] NOT NULL,
	"is_locked" boolean DEFAULT false NOT NULL,
	"login_attempts" integer DEFAULT 0 NOT NULL,
	"lock_until" timestamp with time zone,
	"last_login" timestamp with time zone,
	"reset_password_token" varchar(255),
	"reset_password_expire" timestamp with time zone,
	"email_verification_token" varchar(255),
	"email_verification_expire" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_session" (
	"sessionToken" varchar(255) PRIMARY KEY NOT NULL,
	"userId" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "ConnectionUnlimited_verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_profile" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"display_name" varchar(100) NOT NULL,
	"username" varchar(64) NOT NULL,
	"bio" varchar(500) NOT NULL,
	"avatar" varchar(255),
	"theme" "profile_theme" DEFAULT 'default' NOT NULL,
	"is_public" boolean DEFAULT true NOT NULL,
	"social_links" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"contact_info" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"custom_fields" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"settings" jsonb DEFAULT '{"showEmail":false,"showPhone":false,"allowContact":true,"analyticsEnabled":true}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ConnectionUnlimited_profile_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_qr_code" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"profile_id" varchar(255) NOT NULL,
	"name" varchar(100) NOT NULL,
	"qr_data" text NOT NULL,
	"qr_image" varchar(255),
	"logo" varchar(255),
	"scan_count" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"settings" jsonb DEFAULT '{"size":200,"foregroundColor":"#000000","backgroundColor":"#FFFFFF","errorCorrectionLevel":"M","margin":4}'::jsonb NOT NULL,
	"analytics" jsonb DEFAULT '{"totalScans":0,"uniqueScans":0,"lastScannedAt":null,"scanHistory":[]}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "ConnectionUnlimited_order" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"order_number" varchar(64) NOT NULL,
	"product_type" "product_type_enum" NOT NULL,
	"quantity" integer NOT NULL,
	"total_amount" numeric(12, 2) NOT NULL,
	"status" "order_status_enum" DEFAULT 'pending' NOT NULL,
	"shipping_address" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"payment_status" "payment_status_enum" DEFAULT 'pending',
	"stripe_payment_intent_id" varchar(255) DEFAULT '0' NOT NULL,
	"tracking_number" varchar(255) DEFAULT '0' NOT NULL,
	"estimated_delivery" timestamp with time zone,
	"notes" varchar(500),
	"created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	"updated_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
	CONSTRAINT "ConnectionUnlimited_order_order_number_unique" UNIQUE("order_number")
);
--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_account" ADD CONSTRAINT "ConnectionUnlimited_account_userId_ConnectionUnlimited_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ConnectionUnlimited_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_analytics" ADD CONSTRAINT "ConnectionUnlimited_analytics_user_id_ConnectionUnlimited_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ConnectionUnlimited_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_analytics" ADD CONSTRAINT "ConnectionUnlimited_analytics_profile_id_ConnectionUnlimited_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."ConnectionUnlimited_profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_session" ADD CONSTRAINT "ConnectionUnlimited_session_userId_ConnectionUnlimited_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."ConnectionUnlimited_user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_profile" ADD CONSTRAINT "ConnectionUnlimited_profile_user_id_ConnectionUnlimited_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ConnectionUnlimited_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_qr_code" ADD CONSTRAINT "ConnectionUnlimited_qr_code_user_id_ConnectionUnlimited_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ConnectionUnlimited_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_qr_code" ADD CONSTRAINT "ConnectionUnlimited_qr_code_profile_id_ConnectionUnlimited_profile_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."ConnectionUnlimited_profile"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ConnectionUnlimited_order" ADD CONSTRAINT "ConnectionUnlimited_order_user_id_ConnectionUnlimited_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."ConnectionUnlimited_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_user_id_idx" ON "ConnectionUnlimited_account" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "analytics_user_idx" ON "ConnectionUnlimited_analytics" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "analytics_created_at_idx" ON "ConnectionUnlimited_analytics" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "analytics_event_type_idx" ON "ConnectionUnlimited_analytics" USING btree ("event_type");--> statement-breakpoint
CREATE INDEX "analytics_user_created_at_idx" ON "ConnectionUnlimited_analytics" USING btree ("user_id","created_at");--> statement-breakpoint
CREATE INDEX "user_email_idx" ON "ConnectionUnlimited_user" USING btree ("email");--> statement-breakpoint
CREATE INDEX "user_role_idx" ON "ConnectionUnlimited_user" USING btree ("role");--> statement-breakpoint
CREATE INDEX "user_is_locked_idx" ON "ConnectionUnlimited_user" USING btree ("is_locked");--> statement-breakpoint
CREATE INDEX "t_user_id_idx" ON "ConnectionUnlimited_session" USING btree ("userId");--> statement-breakpoint
CREATE INDEX "profile_user_idx" ON "ConnectionUnlimited_profile" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "profile_username_idx" ON "ConnectionUnlimited_profile" USING btree ("username");--> statement-breakpoint
CREATE INDEX "profile_is_public_idx" ON "ConnectionUnlimited_profile" USING btree ("is_public");--> statement-breakpoint
CREATE INDEX "qr_code_user_idx" ON "ConnectionUnlimited_qr_code" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "qr_code_profile_idx" ON "ConnectionUnlimited_qr_code" USING btree ("profile_id");--> statement-breakpoint
CREATE INDEX "qr_code_is_active_idx" ON "ConnectionUnlimited_qr_code" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "qr_code_created_at_idx" ON "ConnectionUnlimited_qr_code" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "order_user_idx" ON "ConnectionUnlimited_order" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "order_status_idx" ON "ConnectionUnlimited_order" USING btree ("status");--> statement-breakpoint
CREATE INDEX "order_created_at_idx" ON "ConnectionUnlimited_order" USING btree ("created_at");