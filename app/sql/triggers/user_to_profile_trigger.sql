-- 신규 유저가 auth.users에 추가될 때 자동으로 profiles 테이블에 기본 프로필을 생성하는 트리거 (임시)

-- 트리거 먼저 제거 (안 지우면 함수 drop이 막힘)
drop trigger if exists user_to_profile_trigger on auth.users;

-- 함수 제거
drop function if exists public.handle_new_user() cascade;

-- handle_new_user 함수 선언부: 신규 유저가 생성될 때 호출되어 기본 프로필을 생성
create function public.handle_new_user()
returns trigger
language plpgsql  -- 이 함수는 PL/pgSQL(PostgreSQL의 프로시저 언어)로 작성됨
security definer  -- 함수 소유자의 권한으로 실행됨 (보안/권한 제어 목적)
set search_path = ''  -- search_path를 비워서 보안을 강화함 - 스키마 참조 막음 (search_path를 명시적으로 제거)
as $$
begin
    -- NEW는 트리거 함수에서 방금 삽입된 행(Row)을 나타내는 예약어이며,
    -- PostgreSQL 트리거 함수에서 제공하는 특별한 레코드 변수 중 하나임 (INSERT/UPDATE 시 사용).
    -- 반면 OLD는 DELETE/UPDATE 시 이전 행을 나타냄.
    
    -- raw_app_meta_data 필드가 존재하는지 검사
    if new.raw_app_meta_data is not null then  -- new는 auth.users 테이블에 삽입된 행을 의미하며, raw_app_meta_data 필드가 null이 아닌지 확인
        -- provider가 email인 경우에만 profiles 테이블에 insert 수행
        if new.raw_app_meta_data ? 'provider' AND new.raw_app_meta_data ->> 'provider' = 'email' then  -- jsonb 필드 raw_app_meta_data에 'provider' 키가 존재하는지 확인
            -- 이름은 Anonymous, username은 mr. + 랜덤 8자리, role은 developer로 기본 프로필 생성
            insert into public.profiles (profile_id, name, username, role)
            values (new.id, 'Anonymous', 'mr.' || substr(md5(random()::text), 1, 8), 'developer');  -- new.id는 auth.users 테이블에 삽입된 행의 id 값
        end if;
    end if;
    -- 트리거에서는 NEW 레코드를 반환해야 함
    return new;  -- 트리거 함수는 삽입된 행(new)을 반환하여 후속 처리를 계속함
end;
$$;

-- auth.users 테이블에 insert 발생 시 handle_new_user 함수를 실행하는 트리거 정의
create trigger user_to_profile_trigger
after insert on auth.users
for each row execute function public.handle_new_user();