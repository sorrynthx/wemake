-- handle_post_upvote 함수는 post_upvotes 테이블에 새로운 추천(Upvote)이 추가될 때마다 실행됩니다.
-- 목적: posts 테이블의 해당 post의 upvotes 값을 1 증가시킵니다.
-- 트리거 실행 시점: AFTER INSERT (post_upvotes 테이블에 새로운 행이 추가된 후)
-- NEW 레코드: 방금 추가된 post_upvotes 행을 의미하며, NEW.post_id는 추천받은 게시물의 ID입니다.
CREATE FUNCTION public.handle_post_upvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- posts 테이블에서 NEW.post_id에 해당하는 게시물의 upvotes 값을 1 증가시킵니다.
    UPDATE public.posts SET upvotes = upvotes + 1 WHERE post_id = NEW.post_id;
    -- 트리거 함수에서 NEW 레코드를 반환합니다.
    RETURN NEW;
END;
$$;

-- post_upvote_trigger는 post_upvotes 테이블에 행이 추가된 후(handle_post_upvote 함수 실행) 실행됩니다.
-- AFTER INSERT: 새로운 추천이 추가된 직후 트리거가 발동합니다.
CREATE TRIGGER post_upvote_trigger
AFTER INSERT ON public.post_upvotes
FOR EACH ROW EXECUTE FUNCTION public.handle_post_upvote();


-- handle_post_unvote 함수는 post_upvotes 테이블에서 추천(Upvote)이 삭제될 때마다 실행됩니다.
-- 목적: posts 테이블의 해당 post의 upvotes 값을 1 감소시킵니다.
-- 트리거 실행 시점: AFTER DELETE (post_upvotes 테이블에서 행이 삭제된 후)
-- OLD 레코드: 방금 삭제된 post_upvotes 행을 의미하며, OLD.post_id는 추천이 취소된 게시물의 ID입니다.
CREATE FUNCTION public.handle_post_unvote()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    -- posts 테이블에서 OLD.post_id에 해당하는 게시물의 upvotes 값을 1 감소시킵니다.
    UPDATE public.posts SET upvotes = upvotes - 1 WHERE post_id = OLD.post_id;
    -- 트리거 함수에서 OLD 레코드를 반환합니다.
    RETURN OLD;
END;
$$;

-- post_unvote_trigger는 post_upvotes 테이블에서 행이 삭제된 후(handle_post_unvote 함수 실행) 실행됩니다.
-- AFTER DELETE: 추천이 삭제된 직후 트리거가 발동합니다.
CREATE TRIGGER post_unvote_trigger
AFTER DELETE ON public.post_upvotes
FOR EACH ROW EXECUTE FUNCTION public.handle_post_unvote();